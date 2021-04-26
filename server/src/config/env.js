const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4000).required(),
    JWT_SECRET_KEY: Joi.string().default('0123456789').description('This is JWT secret key').required(),
    API_ACCESS_TOKEN: Joi.string().required(),
    DEFAULT_USERNAME: Joi.string().default('admin').required(),
    DEFAULT_PASSWORD: Joi.string().default('123456').required(),
    COUNTRY_API: Joi.string().required(),
    RATE_API: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error)
  throw new Error(`Config validation error: ${error.message}`);

module.exports = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  JWT_SECRET_KEY: envVars.JWT_SECRET_KEY,
  API_ACCESS_TOKEN: envVars.API_ACCESS_TOKEN,
  DEFAULT_USERNAME: envVars.DEFAULT_USERNAME,
  DEFAULT_PASSWORD: envVars.DEFAULT_PASSWORD,
  COUNTRY_API: envVars.COUNTRY_API,
  RATE_API: envVars.RATE_API,
};
