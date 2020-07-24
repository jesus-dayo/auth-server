const expressJwt = require('express-jwt');

const jwt = () => {
  const secret = process.env.SECRET_KEY;
  return expressJwt({ secret, algorithms: [process.env.ENCRYPTION] }).unless({
    path: [
      '/api/signup',
      '/api/login',
    ],
  });
};

module.exports = jwt;
