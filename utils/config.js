const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT || 3001
const connectionString = process.env.MONGO_URI
module.exports = {
  connectionString,
  PORT,
}
