const { env } = require('../../../src/config');
const request = require('supertest');
const app = require('../../../src/app');
const jwt = require('jsonwebtoken');
const faker = require('faker');

describe('Query :: isUserAuthenticated ', () => {

  it('should return a state with value True when the token is valid', async () => {
    const token = jwt.sign({ username: env.DEFAULT_USERNAME }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            isUserAuthenticated{
              state
            }
          }
        `,
      })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      data: {
        isUserAuthenticated: {
          state: true
        }
      }
    });

  });

  it('should return an error when the token is invalid', async () => {
    const token = faker.datatype.uuid();
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            isUserAuthenticated{
              state
            }
          }
        `,
      })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      errors: [
        {
          message: "Authentication failed!",
          locations: expect.any(Array),
          path: [
            "isUserAuthenticated"
          ],
          extensions: {
            code: "UNAUTHENTICATED",
          }
        }
      ],
      data: null
    });
  });
  
});
