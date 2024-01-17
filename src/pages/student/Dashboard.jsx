import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/Kanban/KanbanBoard'
import {
  getBoardsOrCreate,
  getProjectInformation,
  getTasks,
} from '../../services/KanbanBoard'
import { useParams } from 'react-router-dom'
import { getUserId } from '../../utils/utils'

const Dashboard = () => {
  const [initialTasks, setInitialTasks] = React.useState([])
  const { nim } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [board, setBoard] = React.useState({})

  React.useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      const id = await getUserId()
      const board = await getBoardsOrCreate(nim ?? id)
      const project = await getProjectInformation(nim ?? id)
      const tasks = await getTasks(board.id)
      setInitialTasks(tasks)
      const boardInformation = {
        ...board,
        project: project,
      }
      setBoard(boardInformation)
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
