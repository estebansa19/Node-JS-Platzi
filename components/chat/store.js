const Model = require('./model')

function addChat(chat) {
  const myChat = new Model(chat)
  return myChat.save()
}

function listChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {}

    if (userId) {
      filter = {
        users: userId
      }
    }

    Model.find(filter)
      .populate('users')
      .exec((error, populatedData) => {
        if (error) {
          reject(error)
        }

        resolve(populatedData)
      })
  })
}

module.exports = {
  add: addChat,
  list: listChats
}