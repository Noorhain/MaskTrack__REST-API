const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

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

/** Mongoose 'pre' middleware **/
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

/** Mongoose static methods **/
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to log in')
    }
    return user
}


const User = mongoose.model('User', userSchema);
module.exports = User