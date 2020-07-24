const validator = require('validator');

const isLengthValid = (value, max) => (value ? value.length <= max : false);

const isUserValid = (user) => {
  let valid = true;
  if (!user) {
    valid = false;
  }
  if (!user.email || !user.phone || !user.password) {
    valid = false;
  }
  if (!validator.isEmail(user.email)) {
    valid = false;
  }
  if (!isLengthValid(user.email, 20) || !isLengthValid(user.phone, 20) || !isLengthValid(user.password, 20)) {
    valid = false;
  }
  return valid;
};

const isSignInValid = (user) => {
  let valid = true;
  if (!user) {
    valid = false;
  }
  if (!((user.email && user.password) || (user.phone && user.password))) {
    valid = false;
  }
  if (user.email && !validator.isEmail(user.email)) {
    valid = false;
  }
  return valid;
};

module.exports = {
  isUserValid,
  isSignInValid,
};
