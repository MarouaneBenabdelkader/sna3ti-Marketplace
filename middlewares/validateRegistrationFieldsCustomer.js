const { body, validationResult } = require("express-validator");


module.exports = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("phoneNumber is required")
    .isMobilePhone()
    .withMessage("Enter a valid phone number")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: errors.array()[0].msg,
        error:'Bad Request'
      });
    }

    next();
  },
]
