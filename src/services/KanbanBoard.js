// Assuming supabaseClient is already set up and exported from its module
import supabase from '../supabase/supabaseClient'

export async function getBoardsOrCreate(studentId) {
  const { data: boards, error } = await supabase
    .from('boards')
    .select('*')
    .eq('student_id', studentId)

  if (error) {
    throw new Error(error.message)
  }
  // If a board exists, return it
  if (boards.length == 1) {
    return boards[0]
  }
  if (boards.length > 0) {
    return boards[1]
  } else {
    // If no board exists, create one
    return await createBoardForStudent(studentId)
  }
}

async function createBoardForStudent(studentId) {
  const newBoard = {
    student_id: studentId,
  }

  const { data, error } = await supabase
    .from('boards')
    .insert(newBoard)
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

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
        completed
      ),
      comments (
        id,
        content,
        author,
        timestamp
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

export async function createTask(task) {
  const { data, error } = await supabase.from('tasks').insert(task)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function updateTask(task) {
  const { data, error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', task.id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function deleteTask(taskId) {
  const { data, error } = await supabase.from('tasks').delete().eq('id', taskId)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function createTodoTask(todo) {
  const { data, error } = await supabase.from('todos').insert(todo)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function updateTodoTask(todo) {
  const { data, error } = await supabase
    .from('todos')
    .update(todo)
    .eq('id', todo.id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function deleteTodoTask(todoId) {
  const { data, error } = await supabase.from('todos').delete().eq('id', todoId)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function createCommentTask(comment) {
  const { data, error } = await supabase.from('comments').insert(comment)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function updateCommentTask(comment) {
  const { data, error } = await supabase
    .from('comments')
    .update(comment)
    .eq('id', comment.id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function deleteCommentTask(commentId) {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function createAttachmentTask(attachment) {
  const { data, error } = await supabase.from('attachments').insert(attachment)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function updateAttachmentTask(attachment) {
  const { data, error } = await supabase
    .from('attachments')
    .update(attachment)
    .eq('id', attachment.id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function deleteAttachmentTask(attachmentId) {
  const { data, error } = await supabase
    .from('attachments')
    .delete()
    .eq('id', attachmentId)
  if (error) {
    throw new Error(error.message)
  }
  return data
}
