const User = require('../models/user')
const jwt = require("jsonwebtoken")

exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1] // Bearer <
    console.log(req.headers.authorization)
    const secret = process.env.Secret

    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    const decoded = jwt.verify(token, secret)

    req.user = await User.findById(decoded.userId);

    next()
};

exports.isAuthorized = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `You are not allowed to acccess or do something on this resource` })
        }
        next()
    }
}