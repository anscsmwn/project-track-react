import React, { useState } from 'react'
import TodoItem from './ItemTodo'
import {
  createTodoTask,
  deleteTodoTask,
  updateTodoTask,
} from '../services/KanbanBoard'
const TodoList = ({ taskId, todos, type = 'Todo' }) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [isAddTask, setIsAddTask] = useState(false)
  React.useEffect(() => {
    if (todos !== undefined) {
      setTasks(todos)
    }
  }, [todos])
  const addTask = async () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }])
      await createTodoTask({
        title: newTask,
        completed: false,
        task_id: taskId,
      })
      setNewTask('')
    }
  }

  const deleteTask = async (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    await deleteTodoTask(taskId)
  }

  const toggleTaskCompletion = async (taskId) => {
    // Find the task with the given taskId
    const taskToToggle = tasks.find((task) => task.id === taskId)

    taskToToggle.completed = !taskToToggle.completed

    setTasks(tasks.map((task) => (task.id === taskId ? taskToToggle : task)))

    await updateTodoTask({
      id: taskId,
      completed: taskToToggle.completed,
    })
  }

  const editTask = async (task) => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, title: task.title } : t)),
    )
    await updateTodoTask(task)
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
