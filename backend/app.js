const path = require('path')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const app = express()

const usersRoute = require('./controllers/users')
const authRoute = require('./controllers/auth')
const lodgingsRoute = require("./controllers/lodgings")


app.use(cors({credentials: true}))
app.use(express.json())

app.use(express.urlencoded({ extended:true }))

app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  cookie: {
      secure: false
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
})

const passportStrategy = require('./services/auth')



app.use(express.static( "build"))


app.use('/api/users', usersRoute)
app.use('/api/lodgings', lodgingsRoute)

// Routes
app.get('/', middleware.authCheck, (req, res) => {
  console.log(req.user)
  res.send('Successfully logged in')
})
app.use('/api/auth', authRoute)

// Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
