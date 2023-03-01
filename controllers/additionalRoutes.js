const additionalRoutes = require('express').Router()
const Person = require('../models/Person.js')

additionalRoutes.get('/', (request, response, next) => {
  Person.find({})
    .then((results) => {
      const currentTime = Date()
      const message = `<p>Phonebook has info for ${results.length} people</p> 
      <p>${currentTime}</p>`
      response.status(200).send(message).end()
    })
    .catch((err) => next(err))
})

module.exports = additionalRoutes
