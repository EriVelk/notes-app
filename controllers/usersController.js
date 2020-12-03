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
    body('date').trim().escape(),
    check('email').isEmail().normalizeEmail().trim().withMessage('Invalid email').custom(async(email) => {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            throw new Error('Email al ready in use.');
        }
    }),
    body('password').isLength({ min: 8 }).withMessage('The Password must be at least 8 chars long').matches(/\d/).withMessage('The Password must contain a number.'),
    //body('conpassword').isLength({ min: 8 }).withMessage('Confirm password is required.').matches('password').withMessage('Passwords do not match.').trim().escape(),

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
        title: 'Log In'
    });
}

userController.logIn = passport.authenticate('local', {
    failureRedirect: 'login',
    successRedirect: '/notes',
    failureFlash: true
});

userController.renderLogOut = (req, res) => {
    req.logout();
    req.flash("logout_msg", "You are logged out now.");
    res.redirect('/');
}

module.exports = userController;