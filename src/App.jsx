import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Login from './pages/Login'
import StudentDashboard from './pages/student/Dashboard'
import StudentsFeed from './pages/lecturer/Students'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import DashboardAdmin from './pages/admin/Dashboard'

const RedirectIfAuthenticated = () => {
  const profile = JSON.parse(localStorage.getItem('profile'))
  const isAuthenticated = profile !== null

  if (isAuthenticated) {
    // Redirect based on user role
    switch (profile.role) {
      case 'student':
        return <Navigate to="/student/kanban-board" />
      case 'lecturer':
        return <Navigate to="/lecturer/students" />
      case 'admin':
        return <Navigate to="/admin/dashboard" />
      default:
        return <Navigate to="/" />
    }
  }

  return <Login />
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const profile = JSON.parse(localStorage.getItem('profile'))
  const isAuthenticated = profile !== null
  const isAuthorized = isAuthenticated && allowedRoles.includes(profile.role)
  const location = useLocation()
  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" />
  } else if (!isAuthorized) {
    // User is authenticated but not authorized, redirect to not found
    return <Navigate to="/unauthorized" />
  }

  if (location.pathname === '/') {
    if (profile.role === 'student') {
      return <Navigate to="/student/kanban-board" />
    }
    if (profile.role === 'lecturer') {
      return <Navigate to="/lecturer/students" />
    }
    if (profile.role === 'admin') {
      return <Navigate to="/admin/dashboard" />
    }
  }

  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<RedirectIfAuthenticated />} />
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
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute allowedRoles={['lecturer', 'student', 'admin']}>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
