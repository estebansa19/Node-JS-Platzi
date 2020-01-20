const store = require('./store')

function getUsers() {
  return store.list()
}

function addUser(name) {
  if (!name) {
    return Promise.reject('Invalid name')
  }

  const user = { name: name }
  return store.add(user)
}

function updateUser(id, name) {
  return new Promise(async (resolve, reject) => {
    if (!id || !name) {
      reject('Invalid data')
    }

    const result = await store.updateUser(id, name)
    resolve(result)
  })
}

function removeUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('Invalid ID')
    }

    store.remove(id)
      .then(() => resolve())
      .catch(e => reject(e))
  })
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  removeUser
}