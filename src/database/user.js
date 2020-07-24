const db = require('./dynamodb');

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
  const response = await db.getDocClient().scan(params).promise();
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
  const response = await db.getDocClient().scan(params).promise();
  return response;
};

const insertUser = async (user) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Item: { ...user },
  };
  const response = await db.getDocClient().put(params, (err, data) => {
    if (err) console.log(err);
    else console.log('Added user:', JSON.stringify(data, null, 2));
  });
  return response;
};

module.exports = {
  insertUser,
  getUser,
  getSignInUser,
};
