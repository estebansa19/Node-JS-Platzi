const Model = require('./model')

function addMessage(message) {
  const myMessage = new Model(message)
  myMessage.save()
}

async function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {}

    if (filterChat != null) {
      filter = { chat: filterChat }
    }

    Model.find(filter)
      .populate('user')
      .exec((error, populatedData) => {
        if (error) {
          reject(error)
        }

        resolve(populatedData)
      })
  })
}

async function updateMessage(id, message) {
  const foundMessage = await Model.findOne({ _id: id })
  foundMessage.message = message
  const updatedMessage = await foundMessage.save()
  return updatedMessage
}

function removeMessage(id) {
  return Model.deleteOne({ _id: id })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateMessage: updateMessage,
  remove: removeMessage
}