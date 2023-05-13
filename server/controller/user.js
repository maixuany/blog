const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require("../models/role")
const ResponseObject = require('../models/response');
const userController = {};

userController.create = async (req, res, next) => {

}

userController.edit = async (req, res, next) => {

}

userController.getAll = async (req, res, next) => {
    try {
        const listUser = await User.find();
        if (listUser.lenght === 0) {
            return res
                .status(httpStatus.NO_CONTENT).send();
        }
        return res.status(httpStatus.OK).send(listUser);
    } catch (err) {
        next(err)
    }
}


userController.register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ResponseObject("Not Enough Field"));
        }
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ResponseObject("Account already exists"));
        } else {
            const salt = bcrypt.genSaltSync();
            const hashpass = bcrypt.hashSync(password, salt);
            const role_poster = await Role.findOne({ role_id: "POSTER" });
            const newUser = new User({
                fullname: fullname,
                email: email,
                password: hashpass,
                role: role_poster,
            })
            await newUser.save();
            const user = newUser.toJSON();
            delete user.password;
            return res.status(httpStatus.CREATED).send(new ResponseObject("Create Success", user));
        }
    } catch (error) {
        next(error);
    }
}


module.exports = userController;