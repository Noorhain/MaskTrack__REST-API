const express = require('express');
require('./db/mongoose')
const app = express()
require('./startup/routes') (app)

module.exports = app