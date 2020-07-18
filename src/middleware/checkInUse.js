const Mask = require('../models/mask')

const checkInUse = async (req, res, next) => {
    try {
        const mask = await Mask.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if (!mask)
            return res.status(404).send('Mask not found')
        req.mask = mask
        req.isInUse = req.mask.using_now
        next()
    } catch (error) {
        res.status(500).send({
            error: 'There has been an error'
        })
    }
}

module.exports = checkInUse