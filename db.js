//Importing the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const dev_db_url = 'process.env.DB' 
const MONGODB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Database is connect.')).catch(err => console.log('Error: [ ', err));

mongoose.Promise = global.Promise;

const dab = mongoose.connection;
dab.on('error', console.error.bind(console, 'MongoDB conection error: [ '));