const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const { insertUser } = require('./database/user');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.post('/api/signup', async (req, res) => {
  const newUser = req.body;
  await insertUser(newUser);
  res.send({ jwt: 'token' });
});

app.post('/api/login', async (req, res) => {
  const user = req.body;
  res.send({ jwt: 'token' });
});

app.listen(3001, () => {
  console.log('Starting AirAsia API on port 3001');
});

module.exports = app;
