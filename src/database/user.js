const db = require('./dynamodb');

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
};
