const express = require('express');
require('./db/mongoose')
const app = express()
const httpLogger  = require('./config/httpLogger');

app.use(httpLogger)

require('./startup/routes') (app)
module.exports = app