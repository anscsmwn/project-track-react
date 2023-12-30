import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container px-5 sm:px-10">{children}</div>
    </>
  )
}

export default Layout
