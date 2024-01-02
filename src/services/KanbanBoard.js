// Assuming supabaseClient is already set up and exported from its module
import supabase from '../supabase/supabaseClient'

// Refactored as independent functions
export async function getTasks(boardId) {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('board_id', boardId)
  if (error) {
    throw new Error(error.message)
  }
  return tasks
}

export async function getDetailTask(taskId) {
  const { data: task, error } = await supabase
    .from('tasks')
    .select(
      `
      *,
      todos (
        id,
        title,
        check
      ),
      comments (
        id,
        comment
      ),
      attachments (
        id,
        url
      )
    `,
    )
    .eq('id', taskId)
  if (error) {
    throw new Error(error.message)
  }
  return task
}
