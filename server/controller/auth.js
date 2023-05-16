const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const Role = require("../models/role");
const generateAccessToken = require("../utils/jwt");
const ResponseObject = require("../models/response");

const authController = {}

authController.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(httpStatus.UNAUTHORIZED).send(new ResponseObject("Email is incorrect"));
        else {
            const isPasswordVaild = bcrypt.compareSync(password, user.password);
            if (!isPasswordVaild)
                return res.status(httpStatus.UNAUTHORIZED).send(new ResponseObject("Password is incorrect"));
            else {
                const role = await Role.findById(user.role);
                const payload = {
                    email: user.email,
                    role: role.name,
                }
                const token = generateAccessToken(payload);
                user.access_tokens.push(token);
                await user.save();
                return res.status(httpStatus.OK).send(new ResponseObject("Login Success", token));
            }
        }

    } catch (err) {
        next(err);
    }
}

authController.logout = async (req, res, next) => {
    try {
        const user = await userSch.findOne({ email: req.data.email });
        const array_access_token = user.access_tokens.filter((value) => {
            return value !== req.token;
        });
        user.access_token = array_access_token;
        await user.save();
        return res
            .status(httpStatus.OK)
            .send(new ResponseObject("Logout Success"));
    } catch (error) {
        next(error)
    }
}



module.exports = authController;
