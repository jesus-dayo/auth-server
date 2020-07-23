require('chai');
require('assert');
const request = require('supertest');
const app = require('../src/index');

describe('POST /login', () => {
  it('email & password responds with jwt token', (done) => {
    request(app)
      .post('/api/login')
      .send({ email: 'sample@email.com', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('phone & password responds with jwt token', (done) => {
    request(app)
      .post('/api/login')
      .send({ phone: '99988777', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
