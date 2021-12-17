const genericCrud = require('./generic.controller')
const { Order } = require('../model')

const relations = {
  getAll: 'products',
  get: 'products',
}

module.exports = {
  ...genericCrud(Order, relations)
}