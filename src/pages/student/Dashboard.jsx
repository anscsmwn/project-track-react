import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/Kanban/KanbanBoard'
import { getBoardsOrCreate, getTasks } from '../../services/KanbanBoard'
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  const [initialTasks, setInitialTasks] = React.useState([])
  const { nim } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [board, setBoard] = React.useState({})
  React.useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      const board = await getBoardsOrCreate(nim)
      const tasks = await getTasks(board.id)
      setInitialTasks(tasks)
      setBoard(board)
      setIsLoading(false)
    }
    fetchTasks()
  }, [])

  return (
    <>
      <Layout>
        {isLoading ? null : (
          <KanbanBoard
            board={board}
            initialTasks={initialTasks}
            setInitialTasks={setInitialTasks}
          />
        )}
      </Layout>
    </>
  )
}

export default Dashboard
