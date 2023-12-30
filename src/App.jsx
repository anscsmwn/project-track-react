import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import StudentDashboard from './pages/student/Dashboard'
import StudentsFeed from './pages/lecturer/Students'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student/kanban-board" element={<StudentDashboard />} />
        <Route path="/lecturer/students" element={<StudentsFeed />} />
        <Route
          path="/lecturer/students/:nim/kanban-board"
          element={<StudentDashboard />}
        />
      </Routes>
    </>
  )
}

export default App
