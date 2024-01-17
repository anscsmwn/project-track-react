import React from 'react'
import Layout from '../components/Layout'
import { getStorangeProfile, getUserId } from '../utils/utils'
import {
  getProfile,
  getProjectInformation,
  updateProfile,
  updateProjectInformation,
} from '../services/Profile'

const Profile = () => {
  const [profile, setProfile] = React.useState({})
  const [project, setProject] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState('profile')
  const profileId = getUserId()
  React.useEffect(() => {
    setLoading(true)
    const profile = getStorangeProfile()
    setProfile(profile)
    const fetchData = async () => {
      const responseProfile = await getProfile(profileId)
      const responseProject = await getProjectInformation(profileId)
      setProfile(responseProfile[0])
      setProject(responseProject[0])
    }
    fetchData()
    setLoading(false)
  }, [])

  const onSubmitProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    await updateProfile({
      id: profileId,
      first_name: profile.first_name,
      last_name: profile.last_name,
    })
    setLoading(false)
  }
  const onSubmitProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    await updateProjectInformation({
      id: profileId,
      title: project.title,
      description: project.description,
    })
    setLoading(false)
  }
  return (
    <Layout>
      <main className="flex justify-center mt-10">
        <div className="max-w-lg">
          <h1 className="text-xl font-semibold mb-2">Kelola Informasi Anda</h1>
          <p className="text-gray-600 text-sm mb-4">
            Kelola informasi pribadi Anda dan pengaturan lain melalui halaman
            ini.
          </p>
          <div className="text-xs flex gap-2 items-center">
            <button
              onClick={() => setActiveTab('profile')}
              className={
                activeTab === 'profile'
                  ? 'bg-black px-3 py-2 rounded-full text-white'
                  : 'px-3 py-2'
              }
            >
              Personal
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={
                activeTab === 'project'
                  ? 'bg-black px-3 py-2 rounded-full text-white'
                  : 'px-3 py-2'
              }
            >
              Project
            </button>
          </div>
          {activeTab === 'profile' && (
            <form onSubmit={onSubmitProfile}>
              <div className="flex flex-col space-y-2 my-3">
                <label className="label" htmlFor="firstname">
                  First Name
                </label>
                <input
                  name="firstname"
                  className="input-field"
                  type="text"
                  id="firstname"
                  defaultValue={profile.first_name}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      first_name: e.target.value,
                    })
                  }}
                  required
                />
                <label className="label" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  name="lastname"
                  className="input-field"
                  type="lastname"
                  id="lastname"
                  defaultValue={profile.last_name}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      last_name: e.target.value,
                    })
                  }}
                  required
                />
              </div>
              <button
                disabled={loading}
                className="px-3 py-2 text-sm w-full rounded-md text-white font-semibold bg-black border border-solid border-black disabled:opacity-50"
                type="submit"
              >
                {loading ? 'Loading...' : 'Save'}
              </button>
            </form>
          )}
          {activeTab === 'project' && (
            <form onSubmit={onSubmitProject}>
              <div class="flex flex-col space-y-2 my-3">
                <label class="label" for="title">
                  Judul Tugas Akhir
                </label>
                <textarea
                  defaultValue={project.title}
                  class="input-field"
                  id="title"
                  rows="3"
                  onChange={(e) => {
                    setProject({
                      ...project,
                      title: e.target.value,
                    })
                  }}
                  required
                />
                <label class="label" for="description">
                  Deskripsi Tugas Akhir
                </label>
                <textarea
                  defaultValue={project.description}
                  class="input-field"
                  id="description"
                  rows="8"
                  onChange={(e) => {
                    setProject({
                      ...project,
                      description: e.target.value,
                    })
                  }}
                  required
                />
              </div>
              <button
                disabled={loading}
                class="px-3 py-2 text-sm w-full rounded-md text-white font-semibold bg-black border border-solid border-black disabled:opacity-50"
                type="submit"
              >
                {loading ? 'Loading...' : 'Simpan'}
              </button>
            </form>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Profile
