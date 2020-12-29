const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost/notes-app';

mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(db => console.log('Database is connect'))
    .catch(err => console.log('ERROR:[ ', err));
