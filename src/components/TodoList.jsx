import React, { useState } from 'react'
import TodoItem from './ItemTodo'
const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Learn TypeScript', completed: false },
    { id: 3, text: 'Learn Next.js', completed: false },
  ])
  const [newTask, setNewTask] = useState('')
  const [isAddTask, setIsAddTask] = useState(false)

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const editTask = (task) => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, text: task.text } : t)),
    )
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
      {isAddTask ? (
        <div className="p-2 pl-7">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
          />
          <div className="flex items-center gap-2 mt-0">
            <button
              className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65"
              onClick={() => {
                addTask()
                setIsAddTask(false)
              }}
            >
              Add
            </button>
            <button
              className="px-3 py-2 text-black rounded-md hover:bg-gray-100"
              onClick={() => {
                setIsAddTask(false)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65 text-xs ml-7 mt-2"
          onClick={() => {
            setIsAddTask(true)
          }}
        >
          Add an item
        </button>
      )}
    </div>
  )
}

export default TodoList
