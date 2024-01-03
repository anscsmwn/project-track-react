import React from 'react'
import TodoList from './TodoList'

const ProblemSection = ({ taskId }) => {
  return (
    <div>
      <div className="flex gap-2 items-center text-xl pl-2">
        <h2 className="font-semibold">Problem</h2>
      </div>
      <TodoList taskId={taskId} />
    </div>
  )
}

export default ProblemSection
