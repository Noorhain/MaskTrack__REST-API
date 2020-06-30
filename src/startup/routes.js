const express = require("express");
const userRouter = require('../routes/user')
const maskRouter = require('../routes/mask')

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }))

    app.use(userRouter)
    app.use(maskRouter)
}