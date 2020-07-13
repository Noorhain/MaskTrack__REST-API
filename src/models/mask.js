const mongoose = require('mongoose');
const maskSchema = new mongoose.Schema({
    mask_type: {
        type: Array,
        default: [
            'Quirurjica',
            'FFP2',
            'KN95'
        ],
    },
    purchased: Date,
    usage: Date,
    status: {
        type: 'String',
        required: true,
        default: 'Sin usar'
    },
    using_now: {
        type: Boolean,
        required: true,
        default: false
    },
    times_used: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    }
}, {
    timestamps: true
})


const Mask = mongoose.model('Mask', maskSchema)
module.exports = Mask