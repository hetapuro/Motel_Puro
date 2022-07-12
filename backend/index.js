const mongoose = require("mongoose")

const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const mailService = require("./services/mail")
const url = "mongodb+srv://firstuser:pdiWp7QlsnFt0SAK@cluster0.ap86z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })

server.listen(3001, () => {
  console.log(`Server running on port 3001`)
})