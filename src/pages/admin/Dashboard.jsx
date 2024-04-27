import React from 'react'
import searchIcon from '../../assets/search.svg'
import UserModal from '../../components/UserModal'
import Layout from '../../components/Layout'
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'
import { deleteUser, getUserList } from '../../services/Admin'
import Pagination from '../../components/Pagination'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [idUser, setIdUser] = React.useState(null)
  const [userList, setUserList] = React.useState([])
  const [filteredUser, setFilteredUser] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)

  React.useEffect(() => {
    setFilteredUser(userList)
  }, [userList])
  React.useEffect(() => {
    const fetchUserList = async () => {
      const response = await getUserList()
      const userDatas = response.map((item) => {
        return {
          id: item.id,
          name: `${item.first_name} ${item.last_name}`,
          role: item.role,
        }
      })
      setUserList(userDatas)
      setFilteredUser(userDatas)
    }
    fetchUserList()
  }, [])
  const handleDelete = async (id) => {
    try {
      await deleteUser(id)
      setUserList((prev) => prev.filter((user) => user.id !== id))
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  const handleFilterUser = (e) => {
    const value = e.target.value
    const newFilteredStudents = userList.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredUser(newFilteredStudents)
    setCurrentPage(1)
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUser.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const changePage = (pageNumber) => setCurrentPage(pageNumber)

  // Create page numbers
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage)
  return (
    <Layout>
      <div className="border border-zinc-100 p-5 rounded-md w-full">
        <h1 className="font-semibold text-xl">Kelola Daftar Pengguna</h1>
        <p className="text-sm max-w-xl text-gray-500 my-2">
          Pantau dan atur pengguna dalam sistem Anda dengan mudah. Pada halaman
          ini, Anda dapat melihat daftar lengkap pengguna dengan nama dan peran
          mereka dalam sistem. Gunakan fitur pencarian untuk menemukan pengguna
          tertentu dengan cepat.
        </p>
        <button
          onClick={() => {
            setIsModalOpen(true)
            setIdUser(null)
          }}
          className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65 text-xs"
        >
          Tambah User
        </button>
        <div className="my-3 flex items-center gap-2 px-4 py-2 rounded-full w-fit text-xs">
          <img src={searchIcon} alt="search" className="w-4 h-4" />
          <input
            onChange={handleFilterUser}
            type="text"
            className="p-2 outline-none"
            placeholder="Type to search..."
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left p-5">No</th>
                <th className="text-left p-5">Nama User</th>
                <th className="text-left p-5">Role</th>
                <th className="text-left p-5"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentItems.map((item, index) => (
                <tr className="false" key={index}>
                  <td className="p-5 text-left">{index + 1}</td>
                  <td className="p-5 text-left font-semibold max-w-80">
                    {item.name}
                  </td>
                  <td className="p-5 text-left">
                    {item.role === 'student' ? 'Mahasiswa' : 'Dosen'}
                  </td>
                  <td className="p-5 text-left">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setIsModalOpen(true)
                          setIdUser(item.id)
                        }}
                        className="px-2 py-1 hover:bg-gray-200 rounded-md transition-all"
                      >
                        <img
                          src={pencilIcon}
                          alt="edit"
                          className="min-w-4 min-h-4"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 hover:bg-gray-200 rounded-md transition-all"
                      >
                        <img
                          src={trashIcon}
                          alt="delete"
                          className="min-w-4 min-h-4"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          changePage={changePage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      {isModalOpen && (
        <UserModal
          setIsModalOpen={setIsModalOpen}
          setUserList={setUserList}
          id={idUser}
        />
      )}
    </Layout>
  )
}

export default Dashboard
