const phonebookRouter = require('express').Router()
const Person = require('../models/Person.js')

phonebookRouter.get('/', (request, response, next) => {
  Person.find({})
    .then((results) => response.json(results))
    .catch((err) => next(err))
})

phonebookRouter.get('/:id', (request, response, next) => {
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

phonebookRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

phonebookRouter.post('/', (request, response) => {
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

phonebookRouter.put('/:id', (request, response) => {
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

module.exports = phonebookRouter
