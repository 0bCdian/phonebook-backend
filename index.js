// * Configuring the server
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = '3001'

morgan.token('data', (req) => {
  const data = req.body
  const dataLength = Object.keys(data).length
  if (dataLength > 0) {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

// ! Data
// eslint-disable-next-line prefer-const
let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

//* Routes

app.get('/api/persons', (request, response) => {
  response.json(phonebook).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const result = phonebook.filter((person) => person.id === id)
  if (result.length > 0) {
    return response.json(result)
  }
  response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const newPhonebook = phonebook.filter((person) => person.id !== id)
  phonebook = newPhonebook
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const userData = request.body
  if (
    typeof userData.name === 'undefined' ||
    typeof userData.number === 'undefined'
  ) {
    return response.status(400).json({
      error: 'content missing',
    })
  } else if (doesNameExists(userData.name, phonebook)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }
  const newPerson = {
    id: generateId(),
    name: userData.name,
    number: userData.number,
  }
  phonebook = [...phonebook, newPerson]
  response.json(newPerson)
})

app.get('/info', (request, response) => {
  const currentEntries = phonebook.length
  const currentTime = Date()
  const message = `<p>Phonebook has info for ${currentEntries} people</p> 
      <p>${currentTime}</p>`
  response.status(200).send(message).end()
})

// * launch server on port 3001

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})

//* Helper functions

function generateId() {
  return Math.floor(Math.random() * 9999999999)
}

function doesNameExists(name, array) {
  const exists = array.some((person) => person.name === name)
  return exists
}
