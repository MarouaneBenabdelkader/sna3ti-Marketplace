const { check, validationResult } = require('express-validator');

// Validate query parameters
module.exports = [
    check('rating')
    .isInt({ gt: 0, lt: 6 })
    .withMessage('rating should be a number between 1 and 5'),
    check('handicraftId')
    .isMongoId()
    .withMessage('handicraftId should be a valid mongo id'),
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
