import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/Kanban/KanbanBoard'

const Dashboard = () => {
  const [initialTasks, setInitialTasks] = React.useState([
    {
      id: 1,
      title: 'Learn React',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni laudantium nesciunt id fugiat quaerat, cum nemo praesentium sapiente modi in quam esse temporibus voluptas voluptates saepe beatae quidem quae tota',
      status: 'To Do',
    },
    {
      id: 2,
      title: 'Learn TypeScript',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni laudantium nesciunt id fugiat quaerat, cum nemo praesentium sapiente modi in quam esse temporibus voluptas voluptates saepe beatae quidem quae tota',
      status: 'To Do',
    },
    {
      id: 3,
      title: 'Learn Next.js',
      description: 'Learn Next.js and its ecosystem',
      status: 'In Progress',
    },
  ])

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
