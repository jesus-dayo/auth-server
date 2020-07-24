const baseUrl = 'http://localhost:4000';
const request = require('supertest')(baseUrl);
const nock = require('nock');

before(() => {
  nock(baseUrl)
    .put('/api/signup', { email: 'sample@email.com', phone: /.+/i, password: /.+/i })
    .reply(200, { token: '123ABC' });
  nock(baseUrl)
    .put('/api/signup', { email: 'sample@email.com', invalid: '99988777', password: /.+/i })
    .reply(400, { error: 'User required fields are empty' });
});

describe('PUT /signup', () => {
  it('signup success responds with jwt token', (done) => {
    const expected = { token: '123ABC' };
    request
      .put('/api/signup')
      .send({ email: 'sample@email.com', phone: '99988777', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });
  it('signup invalid responds with 400', (done) => {
    const expected = { error: 'User required fields are empty' };
    request
      .put('/api/signup')
      .send({ email: 'sample@email.com', invalid: '99988777', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, expected, done);
  });
});

after(() => {
  nock.cleanAll();
});
