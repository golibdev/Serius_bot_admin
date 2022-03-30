const express = require('express');
const router = express.Router();

router.use('/admin', require('./adminRoute'))
router.use('/course', require('./courseRoute'))

module.exports = router;
