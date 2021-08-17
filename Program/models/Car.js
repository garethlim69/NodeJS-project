const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
  id: Number,
  carname: String,
  brand: String,
  description: String,
  variance: [{
    id: Number,
    name: String,
    price: Number
  }]
})

module.exports = mongoose.model('Car', CarSchema);