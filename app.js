const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const flash = require('connect-flash');
const hash = require('pbkdf2-password');
const path = require('path');
const passport = require('passport');
const { format } = require('timeago.js');


const app = express();
require('./config/passport');
require('./db');

//Importing Routes
const indexRoutes = require('./routes/indexRouter');
const usersRoutes = require('./routes/usersRouter');
const notesRoutes = require('./routes/notesRouter');
const tasksRoutes = require('./routes/tasksRouter');
const callendarRoutes = require('./routes/callendarRouter');

//Config
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: true, // it does not save the session if it is not modified.
    saveUninitialized: true, // don't create a session until something is stored.
    secret: 'very secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req, res, next) => {
    res.locals.logout_msg = req.flash("logout_msg");
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use((req, res, next) => {
    app.locals.format = format;
    next();
});


//Routes
app.use('/', indexRoutes);
app.use('/', usersRoutes);
app.use('/', notesRoutes);
app.use('/', tasksRoutes);
app.use('/', callendarRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});