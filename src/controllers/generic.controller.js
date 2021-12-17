const boom = require('boom')

let findInfo = function (id, model) {
  let info = {
    id: false,
    slug: false,
    query: null
  }
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // query.$or.push({_id: id});
    info.id = true
  }
  try {
    if (model && model.schema.obj.slug) {
      info.slug = true
    }
  } catch {}
  if (info.slug) {
    info.query = {$or: [{slug: id}]}
    if (info.id) {
      info.query.$or.push({_id: id});
    }
  }
  return info
}

const genericCrud = (model, relations) => ({
  async get({ params: { id } }, res) {
    let info = findInfo(id, model)
    console.log('info', info)
    try {
      let item
      if (!info.slug) {
        item = await model.findById(id)
      } else {
        item = await model.findOne(info.query)
      }
      if (relations && relations.get) {
        item = await item.populate(relations.get)
      }
      return res.status(200).send(item)
    } catch (err) {
      return res.status(404).send(boom.boomify(err))
    }
  },
  async getAll(req, res) {
    let query = req.query
    let relationsMode = query.relations
    try {
      let item
      item = await model.find()
      if (relations && relations.getAll && relationsMode !== 'false') {
        item = await model.find().populate(relations.getAll)
      }
      return res.status(200).send(item)
    } catch (err) {
      console.log(err)
      return res.status(400).send(boom.boomify(err))
    }
  },
  async create( { body }, res ) {
    console.log('create', body)
    // // check slug start //
    //
    // let withSameSlug = model.find()
    //
    // // check slug finish //
    try {
      const item = new model(body)
      const newItem = await item.save()
      return res.status(200).send(newItem)
    } catch (err) {
      return res.status(400).send(boom.boomify(err))
    }
  },
  async update( { params: { id }, body }, res) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true } )
      return res.status(200).send(item)
    } catch (err) {
      return res.status(400).send(boom.boomify(err))
    }
  },
  async delete( { params: { id } }, res) {
    console.log('model', model)
    console.log('relations', relations)
    try {
      await model.findByIdAndDelete(id)
      return res.status(200).send({ status: 'OK', message: 'Instance модели удален' })
    } catch (err) {
      return res.status(400).send(boom.boomify(err))
    }
  },
})

module.exports = genericCrud