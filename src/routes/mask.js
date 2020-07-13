const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Mask = require('../models/mask')

router.get('/masks', auth, async(req, res) => {
    try{
        await req.user.populate({
            path: 'masks'
        }).execPopulate()
        res.status(200).send(req.user.masks);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/masks', auth, async (req, res) => {
    const mask = new Mask({
        ...req.body,
        user: req.user._id,
        ref: 'User'
    })
    try {
        await mask.save()
        res.status(201).send(mask)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/masks/:id', auth, async (req, res) => {
    try {
        const mask = await Mask.findOne({_id: req.params.id, user: req.user._id});
        if (!mask)
            return res.status(404).send();
        await mask.remove();
        res.status(200).send('Mask removed');
    } catch (error) {
        res.status(500).send(error);
    }
})



module.exports = router