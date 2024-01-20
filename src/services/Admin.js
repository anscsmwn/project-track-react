import supabase from '../supabase/supabaseClient'

export const createUser = async (user) => {
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.username)
  if (userError) {
    throw userError
  }
  if (users.length > 0) {
    throw new Error('User already exists')
  }
  const { data, error } = await supabase.auth.signUp({
    email: user.username,
    password: user.password,
  })
  await supabase
    .from('users')
    .update({
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    })
    .eq('id', data.user.id)
  if (user.role === 'lecturer') {
    await supabase.from('lecturers').insert([{ id: data.user.id }])
  }
  if (user.role === 'student') {
    await supabase.from('students').insert([{ id: data.user.id }])
    if (user.lecturers.length > 0) {
      await supabase.from('student_lecturer').insert(
        user.lecturers.map((lecturer_id) => ({
          student_id: data.user.id,
          lecturer_id: lecturer_id,
        })),
      )
    }
  }
  if (error) {
    throw error
  }
  return data.user
}

export const updateUser = async (user) => {
  const { data: prevUser, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
  await supabase
    .from('users')
    .update({
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    })
    .eq('id', user.id)
  if (prevUser[0].role === 'lecturer' && user.role === 'student') {
    await supabase.from('lecturers').delete().eq('id', user.id)
    await supabase.from('students').insert([{ id: user.id }])
  }
  if (prevUser[0].role === 'student' && user.role === 'lecturer') {
    await supabase.from('students').delete().eq('id', user.id)
    await supabase.from('lecturers').insert([{ id: user.id }])
    await supabase.from('student_lecturer').delete().eq('student_id', user.id)
  }
  if (user.role === 'student') {
    await supabase.from('student_lecturer').delete().eq('student_id', user.id)
    if (user.lecturers.length > 0) {
      await supabase.from('student_lecturer').insert(
        user.lecturers.map((lecturer_id) => ({
          student_id: user.id,
          lecturer_id: lecturer_id,
        })),
      )
    }
  }
}

export const getLecturers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'lecturer')
  if (error) {
    throw error
  }
  return data
}

export const getUserList = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .neq('role', 'admin')
  if (error) {
    throw error
  }
  return data
}

export const getUser = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
  if (data[0].role === 'student') {
    const { data: lecturerData, error: studentError } = await supabase
      .from('student_lecturer')
      .select('*')
      .eq('student_id', userId)
    if (studentError) {
      throw studentError
    }
    return {
      ...data[0],
      lecturers: lecturerData.map((l) => l.lecturer_id),
      password: '',
    }
  }

  if (error) {
    throw error
  }
  return { ...data[0], password: '' }
}

export const deleteUser = async (userId) => {
  await supabase.from('users').delete().eq('id', userId)
}
