const app = require('./app.js')
const { info } = require('./utils/loggers')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  info('Listening on port: ', PORT)
})
