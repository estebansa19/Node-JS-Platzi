const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', (req, res) => {
  controller.getUsers()
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(e => {
    response.error(req, res, 'Internal error', 500, e)
  })
})

router.post('/', (req, res) => {
  controller.addUser(req.body.name)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.patch('/:id', (req, res) => {
  controller.updateUser(req.params.id, req.body.name)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.delete('/:id', (req, res) => {
  controller.removeUser(req.params.id)
    .then(data => {
      response.success(req, res, `User ${req.params.id} deleted`, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

module.exports = router