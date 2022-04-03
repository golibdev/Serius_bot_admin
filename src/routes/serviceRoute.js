const router = require('express').Router()
const { serviceController } = require('../controllers')
const { verifyAdminToken } = require('../handlers/tokenHandler')

router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)
router.post('/', verifyAdminToken, serviceController.create)
router.put('/:id', verifyAdminToken, serviceController.update)
router.delete('/:id', verifyAdminToken, serviceController.delete)

module.exports = router