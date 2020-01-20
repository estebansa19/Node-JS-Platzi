const store = require('./store')
const socket = require('../../socket').socket
const config = require('../../config')

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error('[messageController] No hay chat, usuario o mensaje')
      reject('Los datos son incorrectos')
    }

    let fileUrl = file ? `${config.host}:${config.port}${config.publicRoute}/${config.filesRoute}/` + file.filename : ''

    let fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl
    }

    store.add(fullMessage)
    socket.io.emit('message', fullMessage)
    resolve(fullMessage)
  })
}

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat))
  })
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject('Invalid data')
    }

    const result = await store.updateMessage(id, message)
    resolve(result)
  })
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('Invalid ID')
    }

    store.remove(id)
      .then(() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}