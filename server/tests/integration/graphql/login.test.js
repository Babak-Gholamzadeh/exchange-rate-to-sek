const { env } = require('../../../src/config');
const request = require('supertest');
const app = require('../../../src/app');
const jwt = require('jsonwebtoken');
const faker = require('faker');

describe('Mutation :: login', () => {

  it('should return a valid token', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation login($username:String!, $password:String!){
            login(username: $username, password:$password) {
              token
            }
          }
        `,
        variables: {
          username: env.DEFAULT_USERNAME,
          password: env.DEFAULT_PASSWORD,
        }
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      data: {
        login: {
          token: expect.any(String)
        }
      }
    });

    const token = res.body.data.login.token;
    const decode = jwt.verify(token, env.JWT_SECRET_KEY);
    expect(decode).toMatchObject({ username: env.DEFAULT_USERNAME });
  });

  it('should return an error when username or password is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation login($username:String!, $password:String!){
            login(username: $username, password:$password) {
              token
            }
          }
        `,
        variables: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
        }
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      data: null,
      errors: [
        {
          extensions: {
            code: "UNAUTHENTICATED",
          },
          locations: expect.any(Array),
          message: "Authentication failed!",
          path: [
            'login',
          ],
        },
      ]
    });
  });
  
});
