import React from 'react'
import Layout from '../components/Layout'
import { getStorangeProfile, getUserId } from '../utils/utils'
import { getProfile, updateProfile } from '../services/Profile'

const Profile = () => {
  const [profile, setProfile] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const profileId = getUserId()
  React.useEffect(() => {
    setLoading(true)
    const profile = getStorangeProfile()
    setProfile(profile)
    const fetchProfile = async () => {
      const response = await getProfile(profileId)
      setProfile(response[0])
    }
    fetchProfile()
    setLoading(false)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await updateProfile({
      id: profileId,
      first_name: profile.first_name,
      last_name: profile.last_name,
    })
    setLoading(false)
  }
  return (
    <Layout>
      <main className="flex justify-center mt-10">
        <div className="max-w-md">
          <h1 className="text-xl font-semibold mb-2">
            Manage your personal information
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            This is an account. Edit your personal information and others
            settings through this page.
          </p>
          <form onSubmit={onSubmit}>
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
        </div>
      </main>
    </Layout>
  )
}

export default Profile
