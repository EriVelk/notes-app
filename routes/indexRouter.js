const express = require('express');
const router = express.Router();

//Importing Controller
const { renderIndex } = require('../controllers/indexController');

router.get('/', renderIndex);

module.exports = router;