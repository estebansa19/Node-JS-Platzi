const statusMessages = {
  '200': 'Done',
  '201': 'Created',
  '400': 'Invalid format',
  '500': 'Internal error'
}

exports.success = (req, res, message, status) => {
  let statusCode = status ?  status : 200
  let statusMessage = message ? message : statusMessages[statusCode]

  console.log(message)

  res.status(statusCode).send({
    error: '',
    body: statusMessage
  })
}

exports.error = (req, res, message, status, details) => {
  console.error(details)

  res.status(status || 500).send({
    error: message,
    body: ''
  })
}