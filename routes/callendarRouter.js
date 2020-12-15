const express = require('express');
const router = express.Router();

const { renderCallendar } = require('../controllers/callendarController');

const { isAuthenticated } = require('../helpers/auth');

//GET render Callendar.
router.get('/callendar', isAuthenticated, renderCallendar);


module.exports = router;