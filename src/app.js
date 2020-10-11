const express = require('express');
require('./db/mongoose')
const app = express()
const httpLogger  = require('./config/httpLogger');
const cors = require('./config/cors')

app.use(httpLogger)
app.use(cors)

require('./startup/routes') (app)
module.exports = app
