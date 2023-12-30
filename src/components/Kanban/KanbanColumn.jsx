import React from 'react'
import KanbanCard from './KanbanCard'
import circleDot from '../../assets/circle-dot.svg'
import circleProgress from '../../assets/circle-progress.svg'
import circleDone from '../../assets/circle-done.svg'

const KanbanColumn = ({ status, tasks, initialTasks, setInitialTasks }) => {
  const [isAdding, setIsAdding] = React.useState(false)
  const [newTaskTitle, setNewTaskTitle] = React.useState('')

  const handleSaveNewTask = () => {
    if (newTaskTitle === '') {
      setIsAdding(false)
      return
    }
    const newTask = {
      id: initialTasks.length + 1,
      title: newTaskTitle,
      description: '',
      status,
    }
    setInitialTasks([...initialTasks, newTask])
    setIsAdding(false)
  }

  return (
    <div className="w-full max-w-72">
      <div className="text-slate-700 flex items-center justify-between gap-2 mb-2 text-sm">
        <div className="flex items-center gap-2">
          {status === 'To Do' && (
            <img
              src={circleDot}
              alt="circle dot"
              className="w-4 h-4 opacity-70"
            />
          )}
          {status === 'In Progress' && (
            <img
              src={circleProgress}
              alt="circle progress"
              className="w-4 h-4 opacity-70"
            />
          )}
          {status === 'Done' && (
            <img
              src={circleDone}
              alt="circle done"
              className="w-4 h-4 opacity-70"
            />
          )}
          <span className="font-semibold">{status}</span>
        </div>
        <span className="opacity-40">{tasks.length}</span>
      </div>
      <div>
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            initialTasks={initialTasks}
            setInitialTasks={setInitialTasks}
          />
        ))}
        {isAdding ? (
          <div className="p-2 my-1 w-full rounded-md flex justify-between shadow-sm border border-solid border-zinc-300 text-sm duration-500">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              onBlur={handleSaveNewTask}
              autoFocus
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSaveNewTask()
                }
              }}
              placeholder="Enter new task"
              className="w-full bg-transparent outline-none"
            />
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center p-2 hover:bg-gray-100 cursor-pointer transition-all rounded-md gap-2 text-sm text-gray-400"
          >
            <p>New</p>
          </button>
        )}
      </div>
    </div>
  )
}

export default KanbanColumn
