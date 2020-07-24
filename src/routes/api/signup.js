const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('../../helpers/validator');

const router = express.Router();
const { getUser, insertUser } = require('../../database/user');

router.put('/signup', (req, res, next) => {
  if (!validator.isUserValid(req.body)) {
    return res.status(400).send({ error: 'User required fields are empty' });
  }
  getUser(req.body).then((user) => {
    console.log('user', user);
    if (user.Count > 0) { return res.status(400).send({ error: 'User already exist.' }); }

    // validation
    return insertUser(req.body).then(() => {
      const token = jwt.sign({ sub: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
      res.json({ token });
    });
  }).catch(next);
});

module.exports = router;
