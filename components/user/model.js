const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
  name: {
    type: String,
    require: true
  }
})

const model = mongoose.model('User', mySchema)
module.exports = model