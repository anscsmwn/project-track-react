import React from 'react'
import { isAuthError } from '@supabase/supabase-js'
import supabase from '../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
const Login = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const roleParams = urlParams.get('role')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    let username = e.target.username.value
    let password = e.target.password.value
    switch (roleParams) {
      case 'admin':
        username = 'admin@unhas.ac.id'
        password = 'admin'
        break
      case 'student':
        username = 'annas@unhas.ac.id'
        password = 'student'
        break
      case 'lecturer':
        username = 'ais@unhas.ac.id'
        password = 'lecturer'
        break
      default:
        break
    }
    try {
      setIsLoading(true)
      setIsError(false)
      const response = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      })
      if (isAuthError(response.error)) {
        setIsError(true)
      }
      const profile = await supabase
        .from('users')
        .select('*')
        .eq('id', response.data.user.id)
      const role = profile.data[0].role
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...response.data,
        })
      )
      localStorage.setItem(
        'profile',
        JSON.stringify({
          ...profile.data[0],
        })
      )

      if (role === 'lecturer') {
        navigate('/lecturer/students')
      }
      if (role === 'student') {
        navigate('/student/kanban-board')
      }
      if (role === 'admin') {
        navigate('/admin/dashboard')
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <main className="flex items-center justify-center min-h-screen px-5 sm:px-10">
      <div className="">
        <h1>Selamat Datang</h1>
        <p className="text-sm mt-1">
          Silakan masukkan email dan kata sandi Anda untuk masuk.
        </p>
        <form id="form-login" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-2 my-3">
            <label className="label" htmlFor="username">
              Email
            </label>
            <input
              name="username"
              className="input-field"
              type="text"
              id="username"
              required
            />
            <label className="label" htmlFor="password">
              Kata Sandi
            </label>
            <input
              name="password"
              className="input-field"
              type="password"
              id="password"
              required
            />
          </div>
          {isError && (
            <Toast
              description="Mohon maaf, terjadi kesalahan. Silakan cek kembali email dan kata sandi Anda lalu coba lagi."
              isError={true}
            />
          )}
          <button
            className="mt-2 px-3 py-2 text-sm w-full rounded-md text-white font-semibold bg-black border border-solid border-black"
            type="submit"
          >
            {isLoading ? 'Loading' : 'Masuk'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
