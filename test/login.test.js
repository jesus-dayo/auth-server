const baseUrl = 'http://localhost:4000';
const request = require('supertest')(baseUrl);
const nock = require('nock');

before(() => {
  nock(baseUrl)
    .put('/api/login', { email: 'sample@email.com', password: 'password' })
    .reply(200, { token: '123ABC' });
  nock(baseUrl)
    .put('/api/login', { phone: '99999999', password: 'password' })
    .reply(200, { token: 'XXXXXABC' });
  nock(baseUrl)
    .put('/api/login', { phone: '99999999', password: 'invalid' })
    .reply(401, { error: 'unauthorized' });
});

describe('POST /login', () => {
  it('valid email and password responds with jwt token', (done) => {
    const expected = { token: '123ABC' };
    request
      .put('/api/login')
      .send({ email: 'sample@email.com', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });
  it('valid phone and password responds with jwt token', (done) => {
    const expected = { token: 'XXXXXABC' };
    request
      .put('/api/login')
      .send({ phone: '99999999', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });
  it('invalid password responds with jwt token', (done) => {
    request
      .put('/api/login')
      .send({ phone: '99999999', password: 'invalid' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

after(() => {
  nock.cleanAll();
});
