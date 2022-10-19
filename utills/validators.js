const { body, validationResult } = require('express-validator');

exports.handleValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        let errorMessages = {};
        errorsArray.forEach((error) => {
            if (!errorMessages[error.param]) errorMessages[error.param] = error.msg;
        });
        return res.status(422).json({ errors: errorMessages });
    }
    next();
};
exports.registerValidation = [
    body("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .trim()
        .isEmail()
        .withMessage("Please enter valid email address")
        .matches("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
        .withMessage("please provide valid email")
        .trim(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 character long.")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
        .withMessage(
            "Please enter a password at least 8 character and contain at least one uppercase, one lower case and one special character."
        )
        .not()
        .matches(/^$|\s+/)
        .withMessage("White space not allowed"),
];

exports.loginValidation = [
    body("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .trim()
        .isEmail()
        .withMessage("Please enter valid email address")
        .trim()
]