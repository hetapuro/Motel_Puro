require('dotenv').config()
const express = require('express')
const app = express()
const Lodging = require('./models/lodging')

let lodgings = [
  {
    "name": "Heta",
    "age": 19,
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/lodgings', (request, response) => {
  Lodging.find({}).then(lodgings => {
    response.json(lodgings)
  })
})

app.get('/api/lodgings/:id', (request, response) => {
  Lodging.findById(request.params.id).then(lodging => {
    response.json(lodging)
  })
})

app.delete('/api/lodgings/:id', (request, response) => {
  const id = Number(request.params.id)
  lodgings = lodgings.filter(lodging => lodging.id !== id)

  response.status(204).end()
})

app.post('/api/lodging', (request, response) => {
  const body = request.body

  if (body.arrival === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const lodging = new Lodging({
    arrival: body.arrival,
    adults: body.adults,
    children: body.children,
    departure: null,
  })

  lodging.save().then(savedLodging => {
    response.json(savedLodging)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})