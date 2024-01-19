import React from 'react'
import searchIcon from '../../assets/search.svg'
import UserModal from '../../components/UserModal'
import Layout from '../../components/Layout'
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'
import { getUserList } from '../../services/Admin'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [idUser, setIdUser] = React.useState(null)
  const [userList, setUserList] = React.useState([])
  React.useEffect(() => {
    const fetchUserList = async () => {
      const response = await getUserList()
      const userData = response.map((item) => {
        return {
          id: item.id,
          name: `${item.first_name} ${item.last_name}`,
          role: item.role,
        }
      })
      setUserList(userData)
    }
    fetchUserList()
  }, [])
  return (
    <Layout>
      <div className="border border-zinc-100 p-5 rounded-md w-full">
        <h1 className="font-semibold text-xl">List User</h1>
        <p className="text-sm max-w-xl text-gray-500 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores a
          quis debitis harum architecto nihil distinctio mollitia officia
          officiis culpa. Consectetur ullam voluptatem vitae eius minima? Harum
          at ducimus est!
        </p>
        <button
          onClick={() => {
            setIsModalOpen(true)
          }}
          className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65 text-xs"
        >
          Tambah User
        </button>
        <div className="my-3 flex items-center gap-2 px-4 py-2 rounded-full w-fit text-xs">
          <img src={searchIcon} alt="search" className="w-4 h-4" />
          <input
            onChange={() => {}}
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
              {userList.map((item, index) => (
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
                      <button className="px-2 py-1 hover:bg-gray-200 rounded-md transition-all">
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
