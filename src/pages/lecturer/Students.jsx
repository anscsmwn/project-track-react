import React from 'react'
import Layout from '../../components/Layout'
import { getMyStudents } from '../../services/Student'
import { Link } from 'react-router-dom'
import trashIcon from '../../assets/trash.svg'
import linkIcon from '../../assets/link.svg'

const Students = () => {
  const [students, setStudents] = React.useState([])
  React.useEffect(() => {
    const lecturerId = 'd14235fa-073b-4e7c-9205-c065d754ab8d'
    const getStudents = async () => {
      const response = await getMyStudents(lecturerId)
      setStudents(
        response.map((item) => {
          return {
            nim: item.id,
            name: `${item.first_name} ${item.last_name}`,
            title: item.students.title,
            progress: item.students.progress ?? 0,
            startProposal: item.students.created_at,
          }
        }),
      )
    }
    getStudents()
  }, [])
  return (
    <Layout>
      <div className="border border-zinc-100 p-5 rounded-md w-full">
        <h1 className="font-semibold text-xl">List Mahasiswa Bimbingan</h1>
        <p className="text-sm max-w-xl text-gray-500 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores a
          quis debitis harum architecto nihil distinctio mollitia officia
          officiis culpa. Consectetur ullam voluptatem vitae eius minima? Harum
          at ducimus est!
        </p>
        <button className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65 text-xs">
          Tambah Mahasiswa
        </button>
        <div className="my-3 flex items-center gap-2">
          <input type="text" className="input-field" />
          <button className="tracking-wider font-medium hover:bg-zinc-100 transition-all duration-300 rounded-md"></button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left p-5">No</th>
                <th className="text-left p-5">Judul</th>
                <th className="text-left p-5">Nama Mahasiswa</th>
                <th className="text-left p-5">Mulai Proposal</th>
                <th className="text-left p-5">Progress</th>
                <th className="text-left p-5"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr className="false">
                  <td className="p-5 text-left">{index + 1}</td>
                  <td className="p-5 text-left font-medium text-blue-500">
                    <Link
                      to={`/lecturer/students/${item.nim}/kanban-board`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:underline cursor-pointer"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="p-5 text-left font-bold">{item.name}</td>
                  <td className="p-5 text-left text-sm">
                    {new Date(item.startProposal).toLocaleDateString()}
                  </td>
                  <td className="p-5 text-left text-sm">{item.progress}%</td>
                  <td className="p-5 text-left text-sm flex items-center gap-2">
                    <Link
                      to={`/lecturer/students/${item.nim}/kanban-board`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img src={linkIcon} alt="link" className="w-4 h-4" />
                    </Link>
                    <button>
                      <img src={trashIcon} alt="trash" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Students
