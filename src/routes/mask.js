const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth');
const Mask = require('../models/mask')

router.post('/masks', auth, async (req, res) => {
    const mask = new Mask({
        ...req.body,
        owner: req.user._id,
        ref: 'User'
    })

    try {
        await mask.save()
        res.status(201).send(mask)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router