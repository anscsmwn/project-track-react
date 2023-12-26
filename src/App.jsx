import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import StudentDashboard from './pages/student/Dashboard'
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </>
  )
}

export default App
