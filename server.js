const express = require('express')
const app = express()
const server = require('http').Server(app)
const config = require('./config')

const cors = require('cors')
const router = require('./network/routes')
const socket = require('./socket')
const db = require('./db')

db(config.dbUrl)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

socket.connect(server)
router(app)

app.use(config.publicRoute, express.static('public'))

server.listen(config.port, () => {
  console.log(`La aplicación está escuchando en ${config.host}:${config.port}`)
})