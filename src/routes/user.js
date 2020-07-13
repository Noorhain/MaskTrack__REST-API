const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth');
const UserDataFormatter = require('../utils/userUtils/UserDataFormatter')

/** POST Endpoints */

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// TODO enviar solamente los datos necesarios desde la BD
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

/** GET Endpoints */

router.get('/users/me', auth, async (req, res) => {
    const formattedUser = UserDataFormatter.prepareData(req.user)
    res.send(formattedUser);
});

/** DELETE Endpoints */

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send('Usuario eliminado');
    } catch (error) {
        res.status(500).send(error);
    }
})

/** Testing purposes only */
router.get('/users', async (req, res) => {
    try {
        let users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router