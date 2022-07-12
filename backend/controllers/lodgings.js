const lodgingsRouter = require("express").Router()
const lodging = require("../models/lodging")
const Lodging = require("../models/lodging")
  
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
      user_id: request.user.id
    })
  
    lodging.save().then(savedLodging => {
      response.json(savedLodging)
    })
  })

  lodgingsRouter.put("/:id", async (req, res) => {
    const new_lodging = {
      arrival: req.body.arrival,
      adults: req.body.adults,
      children: req.body.children,
      departure: req.body.departure,
      user_id: req.body.user_id
    }
    updatedLodging = await Blog.findByIdAndUpdate(request.params.id, new_lodging)
    response.json(updatedLodging)
  })

  lodgingsRouter.get("/current", async (req, res) => {
    const lodgings = await Lodging.find({user_id: req.user.id}).populate("user_id")
    const current_lodging = lodgings.filter(lodging => lodging.departure === null)
    res.json(current_lodging)
  })

  lodgingsRouter.get("/", async (req, res) => {
    let lodgings
    if(req.user.isAdmin){
      lodgings = await Lodging.find({}).populate("user_id")
    }
    else {
      lodgings = await Lodging.find({user_id : req.user.id }).populate("user_id")
    }
    res.json(lodgings)
  })

module.exports = lodgingsRouter