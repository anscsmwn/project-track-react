import supabase from '../supabase/supabaseClient'

export async function getMyStudents(lecturerId) {
  let { data: student_lecturer, error } = await supabase
    .from('student_lecturer')
    .select('student_id')
    .eq('lecturer_id', lecturerId)

  if (error) {
    throw new Error(error.message)
  }

  const { data: students, error: error2 } = await supabase
    .from('users')
    .select(`*, students (title, progress, created_at)`)
    .in(
      'id',
      student_lecturer.map((item) => item.student_id),
    )

  if (error2) {
    throw new Error(error2.message)
  }

  return students
}
