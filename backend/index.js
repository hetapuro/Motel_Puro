const mongoose = require("mongoose")

const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const mailService = require("./services/mail")


mailService.sendCreatedUserMail("puro.touko@gmail.com")


server.listen(3001, () => {
  console.log(`Server running on port 3001`)
})