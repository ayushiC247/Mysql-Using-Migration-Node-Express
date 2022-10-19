const router = require("express").Router()
const { UserController } = require("../controllers")

const { registerValidation, handleValidationErrors, loginValidation } = require("../utills/validators")

router.post("/signup", registerValidation, handleValidationErrors, UserController.signup);
router.post("/login", loginValidation, handleValidationErrors, UserController.login);

module.exports = router