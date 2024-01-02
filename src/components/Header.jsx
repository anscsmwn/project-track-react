import { useState } from 'react'

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }
  return (
    <header className="px-5 sm:px-10 py-4 flex justify-between items-center">
      <p>
        <span className="text-xl font-semibold">
          Undergraduate Thesis Track{' '}
        </span>
      </p>
      <div className="profile-container">
        <div onClick={toggleDropdown} className="profile-icon">
          {/* Replace "AA" with the actual profile image */}
          <span className="profile-initials">AA</span>
        </div>
      </div>
    </header>
  )
}

export default Header
