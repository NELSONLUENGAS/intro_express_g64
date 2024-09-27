const { verify } = require('jsonwebtoken');
const { JWT_SECRET } = process.env
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]

        if (verify(token, String(JWT_SECRET))) {
            req.token = token
            next()
        } else {
            res.status(401).json({ msg: 'Token invalido' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    authMiddleware
}