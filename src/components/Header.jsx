import { useState } from 'react'

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }
  return (
    <header className="px-10 py-4 flex justify-between items-center">
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
        {isDropdownVisible && (
          <div className="profile-dropdown">
            <div className="dropdown-section account-section">
              <span className="account-heading">ACCOUNT</span>
              <span className="account-name">Annas Casmawan Ahmad</span>
              <span className="account-email">annascognito.study@g...</span>
              <div className="account-actions">
                <button>Switch accounts</button>
                <button>Manage account</button>
              </div>
            </div>
            <div className="dropdown-section trello-section">
              <span className="trello-heading">TRELLO</span>
              <button>Profile and visibility</button>
              <button>Activity</button>
              <button>Cards</button>
              <button>Settings</button>
              <button>Theme</button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
