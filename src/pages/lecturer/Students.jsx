import React from 'react'
import Layout from '../../components/Layout'
import { getMyStudents } from '../../services/Student'
import { Link } from 'react-router-dom'
import trashIcon from '../../assets/trash.svg'
import linkIcon from '../../assets/link.svg'
import searchIcon from '../../assets/search.svg'
import { getUserId } from '../../utils/utils'
import Pagination from '../../components/Pagination'

const Students = () => {
  const [students, setStudents] = React.useState([])
  const [filteredStudents, setFilteredStudents] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)

  const getStudents = async () => {
    const lecturerId = await getUserId()
    const response = await getMyStudents(lecturerId)
    const studentData = response.map((item) => {
      return {
        nim: item.id,
        name: `${item.first_name} ${item.last_name}`,
        title: item.students.title,
        progress: item.students.progress ?? 0,
        startProposal: item.students.created_at,
      }
    })
    setStudents(studentData)
    setFilteredStudents(studentData)
  }

  React.useEffect(() => {
    getStudents()
  }, [])

  const handleFilter = (e) => {
    const value = e.target.value
    const newFilteredStudents = students.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredStudents(newFilteredStudents)
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const changePage = (pageNumber) => setCurrentPage(pageNumber)

  // Create page numbers
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  return (
    <Layout>
      <div className="border border-zinc-100 p-5 rounded-md w-full">
        <h1 className="font-semibold text-xl">
          Kelola Daftar Mahasiswa Bimbingan Anda
        </h1>
        <p className="text-sm max-w-xl text-gray-500 my-2">
          Dengan mudah pantau kemajuan mahasiswa, tinjau proposal mereka.
        </p>
        <div className="my-3 flex items-center gap-2 px-4 py-2 rounded-full w-fit text-xs">
          <img src={searchIcon} alt="search" className="w-4 h-4" />
          <input
            onChange={handleFilter}
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
                <th className="text-left p-5">Judul</th>
                <th className="text-left p-5">Nama Mahasiswa</th>
                <th className="text-left p-5">Mulai Proposal</th>
                <th className="text-left p-5">Progress</th>
                <th className="text-left p-5"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-5 text-left">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-5 text-left font-medium text-blue-500 max-w-80">
                    <Link
                      to={`/lecturer/students/${item.nim}/kanban-board`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:underline cursor-pointer"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="p-5 text-left font-semibold">{item.name}</td>
                  <td className="p-5 text-left text-sm">
                    {new Date(item.startProposal).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="p-5 text-left text-sm">{item.progress}%</td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/lecturer/students/${item.nim}/kanban-board`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <img
                          src={linkIcon}
                          alt="link"
                          className="min-w-4 min-h-4"
                        />
                      </Link>
                      <button>
                        <img
                          src={trashIcon}
                          alt="trash"
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
    </Layout>
  )
}

export default Students
