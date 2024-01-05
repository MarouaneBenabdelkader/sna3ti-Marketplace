const { body, validationResult } = require('express-validator');

const validateItemCreation = [
    body('itemName')
        .isLength({min:1})
        .notEmpty()
        .withMessage('Item name is required')
        .trim(),
    
    // add price validation
    body('price')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price must be a number'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 400,
                error: 'bad request',
                message: errors.array()[0].msg});
        }
        next();
    },
];
module.exports = {
    validateItemCreation
}