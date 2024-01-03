import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    try {
      const response = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      })

      localStorage.setItem('user', JSON.stringify(response.data))
      const responseRole = await supabase
        .from('user_role')
        .select('*')
        .eq('user_id', response.data.user.id)
      const role = responseRole.data[0].role
      const profile = await supabase
        .from('users')
        .select('*')
        .eq('id', response.data.user.id)
      localStorage.setItem('profile', JSON.stringify(profile.data[0]))

      if (role === 'lecturer') {
        navigate('/lecturer/students')
      }
      if (role === 'student') {
        navigate('/student/kanban-board')
      }
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="">
        <h1>Welcome Back</h1>
        <p className="text-sm">
          Please enter your username and password to log in.
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-2 my-3">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              name="username"
              className="input-field"
              type="text"
              id="username"
              required
            />
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              name="password"
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
