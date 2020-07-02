const mongoose = require('mongoose')
const Mask = require('./mask')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

/** User Virtuals **/
userSchema.virtual('masks', {
    ref: 'Mask',
    localField: '_id',
    foreignField: 'user'
})

/** User 'pre' middleware **/
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Mask.deleteMany({user: user._id})
})

/** User static methods **/
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

/** User custom methods **/
//TODO Autorrefrescado de tokens - Ver favoritos del navegador
userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},
        process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema);
module.exports = User