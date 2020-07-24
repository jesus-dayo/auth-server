const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const app = express();
app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use(require('./routes'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

const server = app.listen(port, () => {
  console.log(`Starting AirAsia API on port ${port}`);
});

module.exports = { app, server };
