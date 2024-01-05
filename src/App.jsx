import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import StudentDashboard from './pages/student/Dashboard'
import StudentsFeed from './pages/lecturer/Students'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
const ProtectedRoute = ({ children, allowedRoles }) => {
  const profile = JSON.parse(localStorage.getItem('profile'))
  const isAuthenticated = profile !== null
  const isAuthorized = isAuthenticated && allowedRoles.includes(profile.role)

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" />
  } else if (!isAuthorized) {
    // User is authenticated but not authorized, redirect to not found
    return <Navigate to="/not-found" />
  }

  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/student/kanban-board"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/students"
          element={
            <ProtectedRoute allowedRoles={['lecturer']}>
              <StudentsFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/students/:nim/kanban-board"
          element={
            <ProtectedRoute allowedRoles={['lecturer']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['lecturer', 'student']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
