const { body, param, query, validationResult } = require('express-validator');


const ClientValidator = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('email').notEmpty().withMessage('El email es requerido'),
    (req, res, next) => {
        const errors = validationResult(req).mapped()

        if (Object.keys(errors).length) {
            res.status(400).json(errors)
        } else {
            next()
        }
    }
]


module.exports = {
    ClientValidator
}