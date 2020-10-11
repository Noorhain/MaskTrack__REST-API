// Usuario y mascarilla que siempre se creará al iniciar los tests para log in, log out, etc.
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Mask = require('../../src/models/mask');

// Variable para el uso de tokens
const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    username: 'testUser',
    email: 'test@testing.com',
    password: 'thepasswordfor1234tests',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    username: 'testUserTwo',
    email: 'testTwo@testing.com',
    password: 'anotherpassword123',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
};

maskOneId = new mongoose.Types.ObjectId();
const maskOne = {
    _id: maskOneId,
    mask_type_identifier: 1,
    user: userOneId

}

maskTwoId = new mongoose.Types.ObjectId();
const maskTwo = {
    _id: maskTwoId,
    mask_type_identifier: 1,
    user: userTwoId
}

maskThreeId = new mongoose.Types.ObjectId();
const maskThree = {
    _id: maskThreeId,
    mask_type_identifier: 1,
    user: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Mask.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Mask(maskOne).save();
    await new Mask(maskTwo).save();
    await new Mask(maskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwo,
    maskOne,
    maskTwo,
    maskThree,
    setupDatabase
}
