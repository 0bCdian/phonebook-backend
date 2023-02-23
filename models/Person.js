const { Schema, model } = require('mongoose')

const phonebookSchema = new Schema({
  name: String,
  number: String,
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = model('Person', phonebookSchema)

module.exports = Person
