import React from 'react'
import bookmarkIcon from '../assets/bookmark.svg'
import closeIcon from '../assets/close.svg'
import studentIcon from '../assets/student.svg'
import teacherIcon from '../assets/teacher.svg'
import {
  createUser,
  getLecturers,
  getUser,
  updateUser,
} from '../services/Admin'

const UserModal = ({ setIsModalOpen, setUserList, id }) => {
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'student',
    lecturers: [],
  })
  const [lecturerList, setLecturerList] = React.useState([])
  const [choosenLecturer, setChoosenLecturer] = React.useState([])
  React.useEffect(() => {
    if (user.role === 'student') {
      const getLecturerList = async () => {
        const response = await getLecturers()
        setLecturerList(response)
      }
      getLecturerList()
    }
  }, [user.role])
  React.useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const response = await getUser(id)
        setUser({
          id: response.id,
          username: response.email,
          password: response.password,
          first_name: response.first_name,
          last_name: response.last_name,
          role: response.role,
          lecturers: response.lecturers ?? [],
        })
        if (response.lecturers) {
          setChoosenLecturer(response.lecturers)
        }
      }
      fetchUser()
    }
  }, [id])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (id) {
        await updateUser({
          ...user,
        })
        setUserList((prev) =>
          prev.map((item) => {
            if (item.id === user.id) {
              return {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                role: user.role,
              }
            }
            return item
          })
        )
      } else {
        const userResponse = await createUser(user)
        setUserList((prev) => [
          ...prev,
          {
            id: userResponse.id,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
          },
        ])
      }
      setIsModalOpen(false)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false)
      }}
      className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 pl-3 rounded-md lg:w-1/2 md:w-9/12 w-full mx-2 h-[500px] sm:h-[600px] overflow-auto"
      >
        <div className="flex gap-2 items-center justify-between text-3xl">
          <div className="flex items-center gap-1">
            <img src={bookmarkIcon} alt="bookmark" className="w-6 h-6" />
            <h3 className="font-semibold text-2xl">
              {id ? 'Edit User' : 'Tambah User'}
            </h3>
          </div>
          <button onClick={() => setIsModalOpen(false)}>
            <img src={closeIcon} alt="close" className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 my-3">
            <label className="label" htmlFor="first_name">
              Nama Depan
            </label>
            <input
              onChange={(e) => {
                setUser({ ...user, first_name: e.target.value })
              }}
              name="first_name"
              className="input-field"
              type="text"
              id="first_name"
              value={user.first_name}
              required
            />
            <label className="label" htmlFor="last_name">
              Nama Belakang
            </label>
            <input
              onChange={(e) => {
                setUser({ ...user, last_name: e.target.value })
              }}
              name="last_name"
              className="input-field"
              type="text"
              id="last_name"
              value={user.last_name}
              required
            />
            <label className="label" htmlFor="username">
              Email
            </label>
            <input
              onChange={(e) => {
                setUser({ ...user, username: e.target.value })
              }}
              name="username"
              className="input-field"
              type="text"
              id="username"
              value={user.username}
              required
            />
            {!id && (
              <>
                <label className="label" htmlFor="password">
                  Kata Sandi
                </label>
                <input
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                  }}
                  name="password"
                  className="input-field"
                  type="password"
                  id="password"
                  required
                />
              </>
            )}
            <label className="label" htmlFor="role">
              Jenis Pengguna
            </label>
            <div className="flex gap-2 flex-col md:flex-row">
              <button
                onClick={() => {
                  setUser({ ...user, role: 'student' })
                }}
                type="button"
                className={`px-4 py-3 rounded-md border-2 border-solid flex gap-2 text-left
                ${user.role === 'student' && 'border-black'}`}
              >
                <img src={studentIcon} alt="student" className="w-7 h-7" />
                <div>
                  <p className="font-semibold">Mahasiswa</p>
                  <p className="text-sm opacity-70">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit, voluptatem! Veniam non autem, sit laborum
                  </p>
                </div>
              </button>
              <button
                onClick={() => {
                  setUser({ ...user, role: 'lecturer' })
                }}
                type="button"
                className={`px-4 py-3 rounded-md border-2 border-solid flex gap-2 text-left ${
                  user.role === 'lecturer' && 'border-black'
                }`}
              >
                <img src={teacherIcon} alt="teacher" className="w-7 h-7" />
                <div>
                  <p className="font-semibold">Dosen</p>
                  <p className="text-sm opacity-70">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit, voluptatem! Veniam non autem, sit laborum
                  </p>
                </div>
              </button>
            </div>
            {user.role === 'student' && (
              <div>
                <label className="label" htmlFor="role">
                  Dosen Pembimbing
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {lecturerList.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (choosenLecturer.includes(item.id)) {
                          setChoosenLecturer(
                            choosenLecturer.filter(
                              (lecturer) => lecturer !== item.id
                            )
                          )
                          setUser({
                            ...user,
                            lecturers: choosenLecturer.filter(
                              (lecturer) => lecturer !== item.id
                            ),
                          })
                        } else {
                          setChoosenLecturer([...choosenLecturer, item.id])
                          setUser({
                            ...user,
                            lecturers: [...choosenLecturer, item.id],
                          })
                        }
                      }}
                      type="button"
                      className={`py-2 px-4 rounded-lg border-2 border-solid border-black ${
                        choosenLecturer.includes(item.id) &&
                        ' bg-black text-white'
                      }`}
                    >
                      <p className="text-xs">
                        {item.first_name} {item.last_name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            className="px-3 py-2 text-sm w-full rounded-md text-white font-semibold bg-black border border-solid border-black"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : id ? 'Edit User' : 'Tambah User'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserModal
