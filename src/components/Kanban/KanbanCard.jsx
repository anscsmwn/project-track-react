import React from 'react'
import KanbanCardModal from './KanbanCardModal'
import document from '../../assets/document.svg'
import { deleteTask, updateTask } from '../../services/KanbanBoard'

const KanbanCard = ({ task, initialTasks, setInitialTasks }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [taskTitle, setTaskTitle] = React.useState(task.title)
  const handleStatusChange = async (status, id) => {
    setInitialTasks(
      initialTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status,
          }
        }
        return task
      }),
    )
    await updateTask({ status, id })
  }
  const handleChangeTitle = async () => {
    setInitialTasks(
      initialTasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            title: taskTitle,
          }
        }
        return t
      }),
    )
    await updateTask({ title: taskTitle, id: task.id })
    setIsEditing(false)
  }
  return (
    <>
      <div
        onClick={(e) => {
          setIsModalOpen(true)
        }}
        className="group p-2 my-1 w-full rounded-md flex justify-between shadow-sm border border-solid border-zinc-300 hover:bg-gray-100 cursor-pointer transition-all duration-500"
      >
        {isEditing ? (
          <div className="flex items-center gap-1">
            <img src={document} alt="document" className="w-4 h-4" />
            <input
              type="text"
              defaultValue={task.title}
              autoFocus
              onChange={(event) => {
                setTaskTitle(event.target.value)
              }}
              onBlur={() => {
                handleChangeTitle()
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleChangeTitle()
                }
              }}
              className="w-full bg-transparent outline-none text-sm font-normal"
            />
          </div>
        ) : (
          <span
            className={`text-sm font-normal text-slate-700 ${
              task.title === 'Untitled' && 'opacity-35'
            }`}
          >
            {task.title}
          </span>
        )}
        <div className="hidden group-hover:flex text-xs text-gray-400 items-center gap-1">
          <button
            className="hover:text-slate-700 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation()
              setIsEditing(true)
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-slate-700 transition-all duration-300"
            onClick={async (e) => {
              e.stopPropagation()
              setInitialTasks(initialTasks.filter((t) => t.id !== task.id))
              await deleteTask(task.id)
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <KanbanCardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        task={task}
        handleStatusChange={handleStatusChange}
      />
    </>
  )
}

export default KanbanCard
