const docClient = require('./dynamodb');

const initialUser = {
  email: '',
  phone: '',
  password: '',
};

const getUser = async (user) => {
  const inputUser = { ...initialUser, ...user };
  const params = {
    TableName: process.env.USER_TABLE,
    FilterExpression: '#email = :email or #phone=:phone',
    ExpressionAttributeNames: {
      '#email': 'email',
      '#phone': 'phone',
    },
    ExpressionAttributeValues: {
      ':email': inputUser.email,
      ':phone': inputUser.phone,
    },
    ProjectionExpression: 'email, phone, password',
  };
  const response = await docClient.scan(params).promise();
  return response;
};

const getSignInUser = async (user) => {
  const inputUser = { ...initialUser, ...user };
  const params = {
    TableName: process.env.USER_TABLE,
    FilterExpression: '#email = :email or #phone=:phone',
    ExpressionAttributeNames: {
      '#email': 'email',
      '#phone': 'phone',
    },
    ExpressionAttributeValues: {
      ':email': inputUser.email,
      ':phone': inputUser.phone,
    },
    ProjectionExpression: 'email, phone, password',
  };
  const response = await docClient.scan(params).promise();
  return response;
};

const insertUser = async (user) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Item: { ...user },
  };
  const response = await docClient.put(params, (err) => {
    if (err) console.log(err);
    else console.log('Add user successful');
  });
  return response;
};

module.exports = {
  insertUser,
  getUser,
  getSignInUser,
};
