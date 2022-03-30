const router = require('express').Router()
const { courseController } = require('../controllers')
const { verifyAdminToken } = require('../handlers/tokenHandler')

router.get('/', courseController.getAll)
router.get('/:id', courseController.getOne)
router.post('/', verifyAdminToken, courseController.create)
router.put('/:id', verifyAdminToken, courseController.update)
router.delete('/:id', verifyAdminToken, courseController.delete)

module.exports = router