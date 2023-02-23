require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const connectionString = process.env.MONGO_URI
// conect to mongodb
mongoose.connect(connectionString).catch((err) => console.error(err))
