const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
            .replace('Bearer', '')
        const decoded = jwt.verify(token, '' + process.env.JTW_SECRET)
    } catch (error) {
        res.status(401).send({
            error: 'Please authenticate'
        })
    }
}