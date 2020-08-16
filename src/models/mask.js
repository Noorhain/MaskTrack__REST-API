const mongoose = require('mongoose');
const maskSchema = new mongoose.Schema({
    purchased: Date,
    usage: Number,
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
    mask_type_content: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Mask_Type',
        required: false
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