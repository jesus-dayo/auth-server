const expressJwt = require('express-jwt');

const jwt = () => {
  const secret = process.env.SECRET_KEY;
  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      '/api/signup',
      '/api/signin',
    ],
  });
};

module.exports = jwt;
