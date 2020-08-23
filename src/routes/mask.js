const express = require('express')
const router = new express.Router()
const Mask = require('../models/mask')
const MaskType = require('../models/maskType')
const MaskUtils = require('../utils/MaskUtils')
const MaskTypeUtils = require('../utils/MaskTypeUtils')
const auth = require('../middleware/auth')
const checkInUse = require('../middleware/checkInUse')

router.get('/masks', auth, async(req, res) => {
    try {
        await req.user.
            populate({
                path: 'masks'
            }).
            execPopulate()
        res.status(200).send(req.user.masks);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/masks/:id/info', auth, async(req, res) => {
    try {
        const mask = await Mask.findOne({_id: req.body.id})
        if(!mask)
            return res.status(404).send()
        await mask.
            populate('mask_type_content').
            execPopulate()

        const formattedMask = MaskUtils.formatMaskInfo(mask)
        res.status(200).send(formattedMask)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/masks', auth, async(req, res) => {
    const mask = new Mask({
        user: req.user._id,
        ref: 'User',
        mask_type_content: await MaskTypeUtils.getMaskTypeReference(req.body.mask_type_identifier)
    })
    try {
        await mask.
            populate('mask_type_content').
            execPopulate()
        await mask.save()
        res.status(201).send(mask)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Test only
router.post('/masktype', auth, async(req, res) => {
    try {
        const maskType = new MaskType({
            type_identifier: req.body.type_identifier,
            type_name: req.body.type_name,
            type_description: req.body.type_description,
            estimated_duration: req.body.estimated_duration
        })
        await maskType.save()
        res.status(201).send(maskType)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/masks/start/:id', auth, checkInUse, async(req, res) => {
    if (!req.isInUse) {
        const mask = req.mask
        if (MaskUtils.isUsingMaskForFirstTime(mask))
            mask.status = "En uso"
        mask.using_now = true
        mask.times_used.push(new Date())
        try {
            await mask.save()
            res.status(200).send(mask)
        } catch (error) {
            res.status(500).send('Unexpected error: ' + error.message)
        }
    } else {
        res.status(200).send('START | Endpoint should be disabled')
    }
})

router.patch('/masks/stop/:id', auth, checkInUse, async(req, res) => {
    if (req.isInUse) {
        const mask = req.mask
        mask.using_now = false
        MaskUtils.refreshTimeUsed(mask)
        const duration = MaskUtils.getDuration(mask.usage)
        try {
            await mask.save()
            res.status(200).send({ mask, duration })
        } catch (error) {
            res.status(500).send('Unexpected error: ' + error.message)
        }
    } else {
        res.status(200).send('STOP | Endpoint should be disabled')
    }
})

router.delete('/masks/:id', auth, async(req, res) => {
    try {
        const mask = await Mask.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!mask)
            return res.status(404).send()
        await mask.remove()
        res.status(200).send('Mask removed')
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router