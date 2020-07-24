const express = require('express');

const router = express.Router();

router.use(require('./signup'));
router.use(require('./login'));

module.exports = router;
