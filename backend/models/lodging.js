const mongoose = require('mongoose')



const lodgingSchema = new mongoose.Schema({
    arrival: Date,
    adults: Number,
    children: Number,
    departure: Date,
    user_id: mongoose.Schema.Types.ObjectId
})

lodgingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Lodging', lodgingSchema)