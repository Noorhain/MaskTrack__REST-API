const mongoose = require('mongoose');
const maskSchema = new mongoose.Schema({
    mask_type: {
        type: Array,
        default: [
            'Quirurjica',
            'FFP2'
        ],
    },
    fecha_compra: Date,
    tiempo_uso: {
        type: Array,
        default: []
    },
    status: {
        type: 'String',
        required: true,
        default: 'Sin usar'
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