const genericCrud = require('./generic.controller')
const { Product } = require('../model')

const relations = {
  getAll: 'categories',
  get: 'categories',
}

module.exports = {
  ...genericCrud(Product)
}