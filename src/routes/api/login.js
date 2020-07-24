const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('../../helpers/validator');

const router = express.Router();
const { getSignInUser } = require('../../database/user');

router.post('/login', (req, res, next) => {
  if (!validator.isSignInValid(req.body)) {
    return res.status(400).send({ error: 'Invalid sign in inputs' });
  }
  return getSignInUser(req.body).then((user) => {
    if (user.Count > 0) {
      bcrypt.compare(req.body.password, user.Items[0].password, (err, result) => {
        if (result === true) {
          const token = jwt.sign({ sub: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
          res.json({ token });
        } else {
          res.status(401).send({ error: 'Unauthorized' });
        }
      });
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }).catch(next);
});

module.exports = router;
