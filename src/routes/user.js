const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const UserDataFormatter = require('../utils/dataUtils/UserDataFormatter')

router.get('/users', async (req, res) => {
    try {
        let users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const formattedUser = UserDataFormatter.removeAccesoryData(user)
        res.status(200).send(formattedUser)
    } catch (error) {
        res.status(400).send(error)
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