const Model = require('./model')

async function getUsers() {
  return await Model.find()
}

function addUser(user) {
  const myUser = new Model(user)
  return myUser.save()
}

async function updateUser(id, name) {
  const foundUser = await Model.findOne({ _id: id })
  foundUser.name = name
  const updatedUser = await foundUser.save()
  return updatedUser
}

async function removeUser(id) {
  return await Model.deleteOne({ _id: id })
}

module.exports = {
  add: addUser,
  list: getUsers,
  updateUser: updateUser,
  remove: removeUser
}