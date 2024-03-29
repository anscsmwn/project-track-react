import React from 'react'
import TodoList from './TodoList'

const TodoListSection = ({ taskId, todos }) => {
  return (
    <div>
      <div className="flex gap-2 items-center text-xl pl-2">
        <h2 className="font-semibold">To Do</h2>
      </div>
      <TodoList taskId={taskId} todos={todos} />
    </div>
  )
}

export default TodoListSection
