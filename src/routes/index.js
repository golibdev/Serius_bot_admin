const express = require('express');
const router = express.Router();

router.use('/admin', require('./adminRoute'))
router.use('/course', require('./courseRoute'))
router.use('/service', require('./serviceRoute'))

module.exports = router;
