import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/supabaseClient'
import { getStorangeProfile } from '../utils/utils'

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }
  const initialName =
    JSON.parse(localStorage.getItem('profile')).first_name[0].toUpperCase() +
    JSON.parse(localStorage.getItem('profile')).last_name[0].toUpperCase()
  const role = getStorangeProfile().role
  return (
    <header className="px-5 sm:px-10 py-4 flex justify-between items-center">
      <p>
        <span className="text-xl font-semibold"></span>
      </p>
      <div className="profile-container relative">
        <div onClick={toggleDropdown} className="profile-icon cursor-pointer">
          <span className="profile-initials">{initialName}</span>
        </div>
        {isDropdownVisible && (
          <div className="dropdown-menu absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <Link
              to={
                role === 'student'
                  ? '/student/kanban-board'
                  : '/lecturer/students'
              }
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to={'/profile'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                localStorage.clear()
                navigate('/login')
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
