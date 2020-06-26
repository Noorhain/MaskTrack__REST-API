const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Correo electrónico no valido');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    birthdate: Date,
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true // Permite rastrar fechas de creacion, actualizacion, etc.
})

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User