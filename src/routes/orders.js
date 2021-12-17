const router = require('express-promise-router')()
const { checkJWTSign } = require('../middlewares/jwtCheck.middleware')
const { order } = require('../controllers')

router.route('/:id').get(checkJWTSign, order.get)
router.route('/').post(checkJWTSign, order.create)
router.route('/').get(checkJWTSign, order.getAll)
router.route('/:id').put(checkJWTSign, order.update)
router.route('/:id').delete(checkJWTSign, order.delete)

module.exports = router