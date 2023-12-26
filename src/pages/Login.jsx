import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="">
        <h1>Welcome Back</h1>
        <p className="text-sm">
          Please enter your username and password to log in.
        </p>
        <form>
          <div className="flex flex-col space-y-2 my-3">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input className="input-field" type="text" id="username" required />
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input-field"
              type="password"
              id="password"
              required
            />
          </div>
          <button
            className="px-3 py-2 text-sm w-full rounded-md text-white font-semibold bg-black border border-solid border-black"
            type="submit"
          >
            Log in
          </button>
          <Link to="/forgot-password" className="text-xs mt-1">
            Forgot Password?
          </Link>
        </form>
      </div>
    </main>
  )
}

export default Login
