// get user id from local storage
export function getUserId() {
  const data = JSON.parse(localStorage.getItem('user'))
  return data.user.id
}

export function getFullName() {
  const data = JSON.parse(localStorage.getItem('profile'))
  return data.first_name + ' ' + data.last_name
}

export function getStorangeProfile() {
  const data = JSON.parse(localStorage.getItem('profile'))
  return data
}
