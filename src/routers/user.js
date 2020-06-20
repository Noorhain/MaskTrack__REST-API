const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const DateFormatter = require('../utils/dateUtils/DateFormatter')

router.get('/users', async (req, res) => {
    try {
        let users = await User.find({})
        users.forEach((usuario) => {
            usuario.toObject()
            usuario.fecha_nacimiento ? usuario.fecha_nacimiento = DateFormatter.parseDayMonthYear(usuario.fecha_nacimiento) : ''
        })
        console.log(users)

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router