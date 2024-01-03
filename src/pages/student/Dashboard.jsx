import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/Kanban/KanbanBoard'
import { getBoards, getTasks } from '../../services/KanbanBoard'
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  const [initialTasks, setInitialTasks] = React.useState([])
  const { nim } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      const boardId = await getBoards(nim)
      const tasks = await getTasks(boardId)
      setInitialTasks(tasks)
      setIsLoading(false)
    }
    fetchTasks()
  }, [])

  return (
    <>
      <Layout>
        {isLoading ? null : (
          <KanbanBoard
            initialTasks={initialTasks}
            setInitialTasks={setInitialTasks}
          />
        )}
      </Layout>
    </>
  )
}

export default Dashboard
