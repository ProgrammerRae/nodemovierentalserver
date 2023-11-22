/*const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

const url = process.env.LIVEMONGO_URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

let mongoStore = null;

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ');
        mongoStore = MongoStore.create({
            mongoUrl: url,
            collectionName: 'sessions'
        });
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
});

module.exports = { mongoose, mongoStore }; // Export mongoStore as well
*/