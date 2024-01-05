const { check, validationResult } = require('express-validator');

// Validate query parameters
module.exports = [
    check('checkedHandicraft').optional().isBoolean(),
    check('checkedItems').optional().isBoolean(),
    check('itemId').optional().isMongoId().withMessage('itemId should be a valid mongo id'),
    check('customerId').optional().isMongoId().withMessage('customerId should be a valid mongo id'),
    check('rating').optional().isInt({ gt: 0, lt: 6 }).withMessage('rating should be a number between 1 and 5'),
    check('verificationToken').optional().isString().withMessage('should be a string'),
    check('handicraftId').optional().isMongoId().withMessage('handicraftId should be a valid mongo id'),
    check('sort').optional().isIn(['price', 'date', 'rate']), // add all acceptable sort fields here
    check('minPrice').optional().isNumeric().custom((value, { req }) => {
        if (req.query.maxPrice && value > req.query.maxPrice) {
            throw new Error('minPrice should not be greater than maxPrice');
        }
        return true;
    }),
    check('maxPrice').optional().isNumeric(),
    check('limit').optional().isInt({ gt: 0, lt: 51 }), // limit should be between 1 and 50
    check('page').optional().isInt({ gt: 0 }) // page should be greater than 0
    ,
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
