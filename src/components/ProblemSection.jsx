import React from 'react'
import TodoList from './TodoList'

const ProblemSection = ({ problems, taskId }) => {
  return (
    <div>
      <div className="flex gap-2 items-center text-xl pl-2">
        <h2 className="font-semibold">Problem</h2>
      </div>
      <TodoList todos={problems} taskId={taskId} type="Problem" />
    </div>
  )
}

export default ProblemSection
