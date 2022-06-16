const mongoose = require("mongoose")

const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


server.listen(3001, () => {
  console.log(`Server running on port 3001`)
})