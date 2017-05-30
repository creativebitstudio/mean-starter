// Dependencies
const express = require('express');
// path is a core system module that is already included
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
// import config folder and database.js file
const config = require('./config/database');

// Connect mongoose function 
// Takes in from the config folder and database.js file
mongoose.connect(config.database);

// Connection function call to mongoose to let us know that we are connected to db
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// Database error call function
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});

// Initialize an express application
const app = express();

// Importing users.js file from the routes folder to our root app.js file
const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// A Cors middleware npm nodule to simplify our code
// More at the Cors documentation page
app.use(cors());

// Set static public folder 
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware for JSON format
// Code comes from body-parser documentation
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// setting our users.js route to /users on webbrowser 
app.use('/users', users);

// Set a Route for our home page
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Express Server 
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
