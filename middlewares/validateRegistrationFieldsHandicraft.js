const { body, validationResult } = require("express-validator");
const predefinedCrafts = [
  "basketry",
  "carpets and rugs",
  "ceramics",
  "embroidery",
  "metalwork",
  "textiles"
];

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
    .withMessage("Enter a valid email")
  ,
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Enter a valid phone number")
    .trim(),

  body("address")
    .optional({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long")
    .trim(),

  body("craft")
    .notEmpty()
    .withMessage("Craft cannot be empty.")
    .custom((value) => {
      return predefinedCrafts.includes(value);
    })
    .withMessage("Craft must be one of the allowed values : " + predefinedCrafts.join(", ")),

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
