const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)

module.exports = app