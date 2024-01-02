import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/Kanban/KanbanBoard'
import supabase from '../../supabase/supabaseClient'
import { getTasks } from '../../services/KanbanBoard'

const Dashboard = () => {
  const [initialTasks, setInitialTasks] = React.useState([])

  React.useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(1)
      setInitialTasks(tasks)
    }
    fetchTasks()
  }, [])

  return (
    <>
      <Layout>
        <KanbanBoard
          initialTasks={initialTasks}
          setInitialTasks={setInitialTasks}
        />
      </Layout>
    </>
  )
}

export default Dashboard
