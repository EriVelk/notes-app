const userController = {};

const User = require('../models/userModel');

const passport = require('passport');
const { body, validationResult, check } = require('express-validator');

userController.renderRegister = (req, res) => {
    res.render('users/register', {
        title: 'Register'
    });
}

userController.registerUser = [
    //Validate and sanitize fields.
    body('name', 'Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('lastname', 'Last Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('date', 'Date must not be empty.').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail().trim().withMessage('Invalid email').custom(async(email) => {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            throw new Error('Email al ready in use.');
        }
    }),
    body('password').isLength({ min: 8 }).withMessage('The Password must be at least 8 chars long').matches(/\d/).withMessage('The Password must contain a number.').trim(),
    check('conpassword').trim().custom(async(conpassword, { req }) => {
        const password = req.body.password;
        // If password and confirm password not same 
        // don't allow to sign up and throw error
        if (password != conpassword) {
            throw new Error('Passwords do not match');
        }
    }),

    async(req, res, next) => {

        //Extract
        const errors = validationResult(req);

        //Create a User object
        const {
            name,
            lastname,
            date,
            email,
            password
        } = req.body;

        if (!errors.isEmpty()) {
            res.render('users/register', {
                title: 'Register',
                name,
                lastname,
                date,
                email,
                errors: errors.array()
            });
        } else {

            const newUser = new User({
                name,
                lastname,
                date,
                email,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.redirect('login');
        }
    }
];


userController.renderLogIn = (req, res) => {
    res.render('users/login', {
        title: 'Login'
    });
}

userController.logIn = passport.authenticate('local', {
    failureRedirect: 'login',
    successRedirect: '/',
    failureFlash: true
});

userController.renderLogOut = (req, res) => {
    req.logout();
    req.flash("logout_msg", "You are logged out now.");
    res.redirect('/');
}

module.exports = userController;