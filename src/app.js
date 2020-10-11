const express = require('express');
require('./db/mongoose')
const app = express()
const cors = require('./config/cors')
const httpLogger  = require('./config/httpLogger');

app.use(cors)
app.use(httpLogger)

require('./startup/routes') (app)
module.exports = app
