// * Configuring the server

require('./mongo')
const Person = require('./models/Person.js')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
morgan.token('data', (req) => {
  const data = req.body
  const dataLength = Object.keys(data).length
  if (dataLength > 0) {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)
app.use(express.static('build'))

//* Controllers

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((results) => response.json(results))
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  Person.findById(id)
    .then((person) => {
      if (person) {
        return response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (request, response) => {
  const userData = request.body
  const newPerson = new Person({
    name: userData.name,
    number: userData.number,
  })
  newPerson
    .save()
    .then((result) => {
      response.json(result)
    })
    .catch((err) => {
      const errorStatus = err.errors.number
        ? err.errors.number.message
        : err.errors.name.message
      response.status(400).send(errorStatus).end()
    })
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((results) => {
      const currentTime = Date()
      const message = `<p>Phonebook has info for ${results.length} people</p> 
      <p>${currentTime}</p>`
      response.status(200).send(message).end()
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  Person.findByIdAndUpdate(
    person.id,
    { number: person.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((result) => response.json(result))
    .catch((err) => {
      const errorStatus = err.errors.number
        ? err.errors.number.message
        : err.errors.name.message
      response.status(400).send(errorStatus).end()
    })
})

// * Middleware error handling

app.use((request, response) => {
  response.status(404).json({
    error: 'not found',
  })
})

app.use((err, request, response) => {
  console.error(err)
  if (err.name === 'CastError') {
    response.status(400).end()
  } else {
    response.status(500).end()
  }
})

// * launch server

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
