// * Configuring the server
const express = require('express')
const app = express()
const PORT = '3001'
app.use(express.json())

// Data
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
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const result = phonebook.find((person) => person.id === id)
  response.json(result)
})

app.get('/info', (request, response) => {
  const currentEntries = phonebook.length
  const currentTime = Date()
  const message = `<p>Phonebook has info for ${currentEntries} people</p> 
      <p>${currentTime}</p>`
  response.status(200).send(message)
})

// * launch server on port 3001

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
