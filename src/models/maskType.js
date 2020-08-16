const mongoose = require('mongoose')

const maskTypeSchema = new mongoose.Schema({
    type_identifier: {
        type: Number,
        required: true,
        unique: true
    },
    type_name: {
        type: String,
        required: true
    },
    type_description: {
        type: String,
        required: true
    },
    estimated_duration: {
        type: Number,
        required: true
    }}
)

const MaskType = mongoose.model('Mask_Type', maskTypeSchema)
module.exports = MaskType