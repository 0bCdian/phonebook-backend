const { Schema, model } = require('mongoose')

const phonebookSchema = new Schema({
  name: {
    type: String,
    minLength: [
      3,
      'Name must be at least 3 characters long, got {VALUE} instead',
    ],
    required: [true, 'Person name is required'],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        const regex = /(^\d{2}-\d{6,}$)|(^\d{3}-\d{5,}$)/
        return regex.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, 'Person number is required'],
  },
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
