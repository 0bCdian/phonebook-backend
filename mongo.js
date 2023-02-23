// const mongoose = require('mongoose')

const { default: mongoose } = require('mongoose')
const { Schema, model } = mongoose
mongoose.set('strictQuery', true)
if (process.argv.length < 3) {
  console.log('Missing arguments')
  process.exit(1)
}

const [, , password, name, number] = process.argv
const connectionString = `mongodb+srv://diegomiguelp1996:${password}@cluster0.l1ecg6m.mongodb.net/?retryWrites=true&w=majority`

// conect to mongodb
mongoose.connect(connectionString).catch((err) => console.error(err))

const phonebookSchema = new Schema({
  name: String,
  number: String,
})

const Person = model('Person', phonebookSchema)

if (typeof name !== 'undefined' || typeof number !== 'undefined') {
  const newPerson = new Person({
    name,
    number,
  })
  newPerson
    .save()
    .then(() => {
      console.log(`Added ${name} number ${number} to the phonebook`)
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error(err)
    })
} else {
  Person.find({})
    .then((results) => {
      console.log('phonebook: ')
      results.map((result) => console.log(result.name, result.number))
      mongoose.connection.close()
    })
    .catch((err) => console.error(err))
}
