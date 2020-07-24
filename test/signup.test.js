const request = require('supertest');
const AWS = require('aws-sdk-mock');
const decache = require('decache');

describe('PUT /signup', () => {
  let newApp;
  let newServer;
  before(() => {
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, { Items: [], Count: 0 });
    });
    AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, { Items: [{ email: 'sample@email.com', phone: '99988777' }], Count: 1 });
    });
    const { app, server } = require('../src/index');
    newApp = app;
    newServer = server;
  });
  it('signup success responds with jwt token', (done) => {
    request(newApp)
      .put('/api/signup')
      .send({ email: 'sample@email.com', phone: '99988777', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
  it('signup invalid responds with 400', (done) => {
    request(newApp)
      .put('/api/signup')
      .send({ email: 'sample@email.com', invalid: '99988777', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(done);
  });
  after(() => {
    decache('../src/index');
    newServer.close();
    AWS.restore('DynamoDB.DocumentClient');
  });
});
