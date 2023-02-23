require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const connectionString = process.env.MONGO_URI
console.log(connectionString)
// conect to mongodb
mongoose.connect(connectionString).catch((err) => console.error(err))
