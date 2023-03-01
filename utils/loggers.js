const customMorgan = (req) => {
  const data = req.body
  const dataLength = Object.keys(data).length
  if (dataLength > 0) {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
}
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
  customMorgan,
}
