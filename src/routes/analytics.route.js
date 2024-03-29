const express = require('express');

const router = express.Router();
const analyticsController = require('../controller/analytics.controller')

router.get('/', analyticsController.analytics);
module.exports = router;


