const router = require('express').Router()
const { adminController } = require('../controllers')

router.post('/login', adminController.login)

module.exports = router