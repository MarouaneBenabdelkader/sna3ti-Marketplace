const { check, validationResult } = require('express-validator');

const validateItemModification = [
  // Define validation rules for each field
  check('itemName').optional().isString().withMessage('item name must be a string'),
  check('visibility').optional().isBoolean().withMessage('visibility must be a boolean'),
  check('description').optional().isString().withMessage('Description must be a string'),
  check('price').optional().isNumeric().withMessage('Price must be a number'),
  
  // Custom validator to check for allowed fields
  (req, res, next) => {
    const allowedFields = ['itemName', 'description', 'price', 'visibility','images'];
    const invalidKeys = Object.keys(req.body).filter(key => !allowedFields.includes(key));

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        status: 400,
        message: `Invalid field(s): ${invalidKeys.join(', ')}. Allowed fields: ${allowedFields.join(', ')}`
      });
    }
    next();
  },

  // Process validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({  
            status: 400,
            error: 'bad request',
            message: errors.array()[0].msg });
    }
    next();
  }
];
module.exports = {
    validateItemModification
}