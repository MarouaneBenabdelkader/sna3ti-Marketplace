const { body, validationResult } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Enter a valid email')
    ,
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                error: 'bad request',
                message: errors.array()[0].msg
            });
        }

        next();
    },
];
