const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Import Mongoose
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
dotenv.config();

app.use(session({
  secret: 'imSecret',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.LIVEMONGO_URL }),
  cookie: {
    maxAge: null,
    secure: false
  }
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true  
}));
app.use('/', routes);

mongoose.connect(process.env.LIVEMONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log("Connected successfully to MongoDB server"))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
