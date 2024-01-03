import React from 'react'
import KanbanColumn from './KanbanColumn'
import searchIcon from '../../assets/search.svg'

const KanbanBoard = ({ board, initialTasks, setInitialTasks }) => {
  const renderKanbanColumn = (status) => {
    return (
      <KanbanColumn
        board={board}
        status={status}
        tasks={initialTasks.filter((task) => task.status === status)}
        setInitialTasks={setInitialTasks}
        initialTasks={initialTasks}
      />
    )
  }
  return (
    <div>
      <h1 className="font-semibold text-3xl mt-3">Kanban Board</h1>
      <p className="mt-1 mb-2 text-gray-500 max-w-2xl text-sm">
        {board.description}
      </p>
      <div className="font-inter p-1 flex mb-4 text-gray-500 justify-end text-sm font-medium font-inter border-b border-solid border-gray-300">
        <button className="tracking-wide font-medium px-2 py-1 hover:bg-gray-200 transition-all duration-300 rounded-md">
          Sort
        </button>
        <button className="tracking-wide font-medium px-2 py-1 hover:bg-gray-200 transition-all duration-300 rounded-md">
          Filter
        </button>
        <button className="tracking-wider font-medium px-2 py-1 hover:bg-gray-200 transition-all duration-300 rounded-md">
          <img src={searchIcon} alt="search" className="w-4 h-4 opacity-60" />
        </button>
      </div>
      <div className="flex gap-5 overflow-auto">
        {renderKanbanColumn('To Do')}
        {renderKanbanColumn('In Progress')}
        {renderKanbanColumn('Done')}
      </div>
    </div>
  )
}

export default KanbanBoard
