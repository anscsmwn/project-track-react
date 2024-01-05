import React from 'react'
import KanbanCardModal from './KanbanCardModal'
import document from '../../assets/document.svg'
import { deleteTask, updateTask } from '../../services/KanbanBoard'
import { updateProgress } from '../../services/Student'
import { getUserId } from '../../utils/utils'

const KanbanCard = ({ task, initialTasks, setInitialTasks }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [taskTitle, setTaskTitle] = React.useState(task.title)
  const handleStatusChange = async (status, id) => {
    const updatedTasks = initialTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status,
        }
      }
      return task
    })

    setInitialTasks(updatedTasks)
    await updateTask({ status, id })

    const doneTasks = updatedTasks.filter((task) => task.status === 'Done')
    const percentage = parseInt((doneTasks.length / updatedTasks.length) * 100)
    const idStudent = await getUserId()
    await updateProgress(idStudent, percentage)
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
        className="max-w-[290px] min-w-[290px] group p-2 my-1 w-full rounded-md flex justify-between shadow-sm border border-solid border-zinc-300 hover:bg-gray-100 cursor-pointer transition-all duration-500"
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
              const updatedTasks = initialTasks.filter((t) => t.id !== task.id)
              setInitialTasks(initialTasks.filter((t) => t.id !== task.id))
              await deleteTask(task.id)
              const doneTasks = updatedTasks.filter(
                (task) => task.status === 'Done',
              )
              const percentage = parseInt(
                (doneTasks.length / updatedTasks.length) * 100,
              )
              const idStudent = await getUserId()
              await updateProgress(idStudent, percentage)
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {isModalOpen && (
        <KanbanCardModal
          setIsModalOpen={setIsModalOpen}
          task={task}
          handleStatusChange={handleStatusChange}
        />
      )}
    </>
  )
}

export default KanbanCard
