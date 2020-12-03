const express = require('express');
const router = express.Router();

//Importing Controllers
const {
    renderLogIn,
    renderLogOut,
    renderRegister,
    logIn,
    registerUser
} = require('../controllers/usersController');


router.get('/users/register', renderRegister);

router.post('/users/register', registerUser);


router.get('/users/login', renderLogIn);

router.post('/users/login', logIn);


router.get('/users/logout', renderLogOut);

module.exports = router;