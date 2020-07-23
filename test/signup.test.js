const chai = require('chai');
const request = require('supertest');
const app = require('../src/index');

describe('POST /signup', () => {
  it('signup responds with jwt token', (done) => {
    request(app)
      .post('/api/signup')
      .send({ email: 'sample@email.com', phone: '99988777', password: 'password' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
