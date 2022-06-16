const lodgingsRouter = require("express").Router()
const Lodging = require("../models/lodging")
lodgingsRouter.get('/', (request, response) => {
    Lodging.find({}).then(lodgings => {
      response.json(lodgings)
    })
  })
  
  lodgingsRouter.get('/:id', (request, response) => {
    Lodging.findById(request.params.id).then(lodging => {
      response.json(lodging)
    })
  })
  
  lodgingsRouter.delete('/:id', (request, response) => {
    const id = Number(request.params.id)
    lodgings = lodgings.filter(lodging => lodging.id !== id)
  
    response.status(204).end()
  })
  
  lodgingsRouter.post('/', (request, response) => {
  
    if (request.body.arrival === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const lodging = new Lodging({
      arrival: request.body.arrival,
      adults: request.body.adults,
      children: request.body.children,
      departure: null,
      user_id: request.body.user_id
    })
  
    lodging.save().then(savedLodging => {
      response.json(savedLodging)
    })
  })

module.exports = lodgingsRouter