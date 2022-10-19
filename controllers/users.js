const jwt = require('jsonwebtoken');
const db = require("../models");
const { encryptPassword, comparePassword } = require("../common/password")

const User = db.User;


/**
 * Signup API
 */
const signup = async (req, res) => {
    try {
        const {
            body: { email, password },
        } = req;
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({
                message: "Email already exist",
            });
        }
        const hashedPassword = await encryptPassword(password);
        const createdUser = await User.create({
            email,
            password: hashedPassword
        });
        return res.status(200).json({ message: "Signup successfully!!", data: createdUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * Login API
 */
const login = async (req, res) => {
    try {
        const {
            body: { email, password },
        } = req;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({
                message: "Email and Password does not match!!",
            });
        }
        const isPasswordMatched = await comparePassword(
            password,
            user.dataValues.password
        );
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Email and Password does not match!!",
            });
        }
        const access = {
            id: user.email,
        };
        const token = jwt.sign(access, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        return res.status(200).json({ message: "login successfully!!", token: token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}
const UserController ={
    login,signup
}
module.exports = UserController
