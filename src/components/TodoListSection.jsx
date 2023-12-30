import React from 'react'
import TodoList from './TodoList'

const TodoListSection = () => {
  return (
    <div>
      <div className="flex gap-2 items-center text-xl pl-2">
        <h2 className="font-semibold">To Do</h2>
      </div>
      <TodoList />
    </div>
  )
}

export default TodoListSection
