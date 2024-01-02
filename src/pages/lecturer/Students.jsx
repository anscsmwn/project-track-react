import React from 'react'
import Layout from '../../components/Layout'
import supabase from '../../supabase/supabaseClient'

const Students = () => {
  const students = [
    {
      name: 'Student 1',
      nim: '0000000001',
      gpa: 3.5,
      start_proposal: '2021-01-01',
    },
  ]
  React.useEffect(() => {
    const lecturerId = 'd14235fa-073b-4e7c-9205-c065d754ab8d'
    const getStudents = async () => {
      const { data: datas } = await supabase
        .from('student_lecturer')
        .select('*')
        .eq('lecturer_id', lecturerId)
      const student_ids = datas.map((data) => data.student_id)
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .in('id', student_ids)
    }
    getStudents()
  }, [])
  return (
    <Layout>
      <div className="border border-zinc-100 p-5 rounded-md">
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
              <tr className="false">
                <td className="p-5 text-left">1</td>
                <td className="p-5 text-left font-medium text-blue-500">
                  <a
                    href="/vote/detail/OTOOQP"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    dsf
                  </a>
                </td>
                <td className="p-5 text-left font-bold">OTOOQP</td>
                <td className="p-5 text-left text-sm">26 Dec 2023 11:55 am</td>
                <td className="p-5 text-left text-sm">10%</td>
                <td className="p-5 text-left text-sm">
                  <a
                    href="/lecturer/students/:nim/kanbanboard"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-8 h-8 p-2 hover:bg-zinc-100 rounded-md"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-8 h-8 p-2 hover:bg-zinc-100 rounded-md"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Students
