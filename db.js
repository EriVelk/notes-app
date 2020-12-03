//Importing the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const dev_db_url = 'mongodb://u0vcpbuwaksc7xkocr8z:SlHMX1XtcltNBniEtKUc@bfphhmeuraswone-mongodb.services.clever-cloud.com:27017/bfphhmeuraswone';

const MONGODB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Database is connect.')).catch(err => console.log('Error: [ ', err));

mongoose.Promise = global.Promise;

const dab = mongoose.connection;
dab.on('error', console.error.bind(console, 'MongoDB conection error: [ '));