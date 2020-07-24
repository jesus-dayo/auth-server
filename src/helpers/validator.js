const isUserValid = (user) => {
  let error = true;
  if (!user) {
    error = false;
  }
  if (!user.email || !user.phone || !user.password) {
    error = false;
  }

  return error;
};

const isSignInValid = (user) => {
  let error = true;
  if (!user) {
    error = false;
  }
  if (!((user.email && user.password) || (user.phone && user.password))) {
    error = false;
  }

  return error;
};

module.exports = {
  isUserValid,
  isSignInValid,
};
