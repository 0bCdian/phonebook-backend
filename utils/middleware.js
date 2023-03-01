const { error, info } = require('./loggers')

const unknownRoute = (request, response) => {
  info(request)
  response.status(404).json({
    error: 'not found',
  })
}

const handleErrors = (err, request, response) => {
  error(err)
  if (err.name === 'CastError') {
    response.status(400).end()
  } else {
    response.status(500).end()
  }
}

module.exports = {
  unknownRoute,
  handleErrors,
}
