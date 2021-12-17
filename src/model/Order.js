const {model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  status: {
    type: String,
    default: 'created'
  },
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    default: ''
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  products: [{
    type: ObjectId,
    ref: 'Product'
  }]
})

module.exports = model('Order', schema)