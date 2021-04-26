const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());

// Limit the requests to 30 times per mutine
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 30,
}));

module.exports = app;
