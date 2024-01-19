import supabase from '../supabase/supabaseClient'

export const getProfile = async (profileId) => {
  const { data, error } = await supabase
    .from('users')
    .select(
      `
      id,
      first_name,
      last_name,
      role
    `,
    )
    .eq('id', profileId)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getProjectInformation = async (profileId) => {
  const { data, error } = await supabase
    .from('students')
    .select(
      `
      id,
      title,
      description
    `,
    )
    .eq('id', profileId)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const updateProfile = async (profile) => {
  const { data, error } = await supabase
    .from('users')
    .update(profile)
    .eq('id', profile.id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const updateProjectInformation = async (project) => {
  const { data, error } = await supabase
    .from('students')
    .update(project)
    .eq('id', project.id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}
