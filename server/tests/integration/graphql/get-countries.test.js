const { env } = require('../../../src/config');
const request = require('supertest');
const app = require('../../../src/app');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const axios = require('axios');
jest.mock('axios');

describe('Query :: getCountries ', () => {

  beforeAll(() => {
    // mock axios for fetching country data and exchange rate data
    axios.get = jest.fn(url => {
      const response = { data: {} };
      if (url.includes(env.COUNTRY_API)) {
        response.data = [
          {
            "currencies": [{
              "code": "USD",
              "name": "United States dollar",
              "symbol": "$"
            }],
            "flag": "https://restcountries.eu/data/usa.svg",
            "name": "United States of America",
            "population": 323947000
          }];
      } else if (url.includes(env.RATE_API)) {
        response.data = {
          "success": true,
          "base": "EUR",
          "rates": {
            "SEK": 10.13261,
            "USD": 1.208846
          }
        }
      }
      return Promise.resolve(response);
    });
  });

  it('should return the data of USA correctly', async () => {
    const name = 'usa';
    const token = jwt.sign({ username: env.DEFAULT_USERNAME }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query getCountries($name:String!){
            getCountries(name:$name){
              name
              population
              flag
              currencies {
                code
                rateToSEK
              }
            }
          }
        `,
        variables: {
          name
        }
      })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      "data": {
        "getCountries": [
          {
            "name": "United States of America",
            "population": 323947000,
            "flag": "https://restcountries.eu/data/usa.svg",
            "currencies": [
              {
                "code": "USD",
                "rateToSEK": 0.11930252916079866
              }
            ]
          }
        ]
      }
    });
  });

  it('should return an empty list when name is empty', async () => {
    const name = '';
    const token = jwt.sign({ username: env.DEFAULT_USERNAME }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query getCountries($name:String!){
            getCountries(name:$name){
              name
              population
              flag
              currencies {
                code
                rateToSEK
              }
            }
          }
        `,
        variables: {
          name
        }
      })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      "data": {
        "getCountries": []
      }
    });
  });

  it('should return an error when the token is invalid', async () => {
    const name = 'usa';
    const token = faker.datatype.uuid();
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query getCountries($name:String!){
          getCountries(name:$name){
            name
            population
            flag
            currencies {
              code
              rateToSEK
            }
          }
        }
      `,
        variables: {
          name
        }
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
            "getCountries"
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
