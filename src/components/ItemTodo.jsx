import React, { useState } from 'react'
import tripleDot from '../assets/triple-dot.svg'
function TodoItem({ task, toggleTaskCompletion, editTask, deleteTask }) {
  const [showMenu, setShowMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState(task.title)
  const handleToggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setShowMenu(false)
  }

  const handleDelete = () => {
    deleteTask(task.id)
    setShowMenu(false) // Close the menu after clicking
  }

  return (
    <li
      key={task.id}
      className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md group"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTaskTitle}
              autoFocus
              onChange={(event) => {
                setNewTaskTitle(event.target.value)
              }}
              onBlur={() => {
                editTask({
                  id: task.id,
                  title: newTaskTitle,
                  completed: task.completed,
                })
                setIsEditing(false)
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  editTask({
                    id: task.id,
                    title: newTaskTitle,
                    completed: task.completed,
                  })
                  setIsEditing(false)
                }
              }}
              className="w-full bg-transparent outline-none"
            />
          </>
        ) : (
          <label className={`${task.check ? 'line-through' : ''}`}>
            {task.title}
          </label>
        )}
      </div>
      <div className="relative">
        <button
          onClick={handleToggleMenu}
          className="group-hover:opacity-100 opacity-0 transition-all duration-300 cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <img src={tripleDot} alt="triple dot" className="w-3 h-3" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1 text-gray-700">
              <li>
                <button
                  onClick={handleEdit}
                  className="block px-4 py-2 text-xs hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={handleDelete}
                  className="block px-4 py-2 text-xs hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  )
}

export default TodoItem
