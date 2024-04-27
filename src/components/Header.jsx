import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/supabaseClient'
import { getStorangeProfile } from '../utils/utils'
import profileIcon from '../assets/profile.svg'
const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }
  const profile = getStorangeProfile()
  const role = getStorangeProfile().role
  return (
    <header className="px-5 sm:px-10 py-4 flex justify-between items-center">
      <p>
        <span className="text-xl font-semibold"></span>
      </p>
      <div className="profile-container relative">
        <div onClick={toggleDropdown} className="profile-icon cursor-pointer">
          <img src={profileIcon} />
        </div>
        {isDropdownVisible && (
          <div className="dropdown-menu absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <p className="px-4 pt-2 pt text-gray-700 font-semibold">
              {profile.first_name} {profile.last_name}
            </p>
            <p className="px-4 text-xs">{profile.email}</p>
            <div
              data-orientation="horizontal"
              role="none"
              class="shrink-0 bg-border h-[1px] w-full my-2 border border-solid"
            ></div>
            <Link
              to={
                role === 'student'
                  ? '/student/kanban-board'
                  : '/lecturer/students'
              }
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                role === 'admin' && 'hidden'
              }`}
            >
              Home
            </Link>
            <Link
              to={'/profile'}
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                role === 'admin' && 'hidden'
              }`}
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
