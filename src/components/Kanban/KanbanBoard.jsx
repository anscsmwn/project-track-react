import React, { useEffect } from 'react'
import KanbanColumn from './KanbanColumn'
import searchIcon from '../../assets/search.svg'

const KanbanBoard = ({ board, initialTasks, setInitialTasks }) => {
  const [visibleStatuses, setVisibleStatuses] = React.useState([
    'To Do',
    'In Progress',
    'Done',
  ])
  const [isSearchVisible, setIsSearchVisible] = React.useState(false)
  const [filteredTasks, setFilteredTasks] = React.useState(initialTasks)
  useEffect(() => {
    setFilteredTasks(initialTasks)
  }, [initialTasks])
  const renderKanbanColumn = (status) => {
    if (!visibleStatuses.includes(status)) return null
    return (
      <KanbanColumn
        board={board}
        status={status}
        tasks={filteredTasks.filter((task) => task.status === status)}
        setInitialTasks={setInitialTasks}
        initialTasks={initialTasks}
      />
    )
  }

  const toggleStatusVisibility = (status) => {
    if (visibleStatuses.includes(status)) {
      setVisibleStatuses(visibleStatuses.filter((s) => s !== status))
    } else {
      setVisibleStatuses([...visibleStatuses, status])
    }
  }
  return (
    <div>
      <h1 className="font-semibold text-2xl mt-3 max-w-5xl">
        {board.project.title}
      </h1>
      <p className="mt-1 mb-2 text-gray-500 max-w-2xl text-sm">
        {board.project.description}
      </p>
      <div className="font-inter p-1 flex mb-4 text-gray-500 justify-end text-sm font-inter border-b border-solid border-gray-300 gap-1">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <button
            key={status}
            onClick={() => toggleStatusVisibility(status)}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              visibleStatuses.includes(status)
                ? 'bg-black text-white'
                : 'bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
        <button
          onClick={() => {
            setIsSearchVisible(!isSearchVisible)
          }}
          className="tracking-wider font-medium px-2 py-1 hover:bg-gray-200 transition-all duration-300 rounded-md"
        >
          <img src={searchIcon} alt="search" className="w-4 h-4 opacity-60" />
        </button>
        {isSearchVisible && (
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded-md border border-solid border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
            onChange={(event) => {
              const searchTerm = event.target.value.toLowerCase()
              setFilteredTasks(
                initialTasks.filter((task) =>
                  task.title.toLowerCase().includes(searchTerm),
                ),
              )
            }}
          />
        )}
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
