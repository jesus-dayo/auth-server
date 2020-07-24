const request = require('supertest');
const AWS = require('aws-sdk-mock');
const bcrypt = require('bcrypt');
const decache = require('decache');

describe('POST /login', () => {
  let newApp;
  let newServer;
  before(() => {
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      bcrypt.hash('password', parseInt(process.env.SALT_ROUNDS), (err, hash) => {
        callback(null, { Items: [{ email: 'sample@email.com', phone: '99999999', password: hash }], Count: 1 });
      });
    });
    const { app, server } = require('../src/index');
    newApp = app;
    newServer = server;
  });
  it('valid email and password responds with jwt token', (done) => {
    request(newApp)
      .post('/api/login')
      .send({ email: 'sample@email.com', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
  it('valid phone and password responds with jwt token', (done) => {
    request(newApp)
      .post('/api/login')
      .send({ phone: '99999999', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
  it('invalid password responds with jwt token', (done) => {
    request(newApp)
      .post('/api/login')
      .send({ phone: '99999999', password: 'invalid' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  });
  after(() => {
    newServer.close();
    decache('../src/index');
    AWS.restore('DynamoDB.DocumentClient');
  });
});
