const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require("../models/role")
const ResponseObject = require('../models/response');
const { default: mongoose } = require('mongoose');
const userController = {};

userController.create = async (req, res, next) => {
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
            const role_poster = await Role.findOne({ role_id: "ADMIN" });
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

userController.edit = async (req, res, next) => {

}

userController.getAll = async (req, res, next) => {
    try {
        const listUser = await User.find().populate("role");
        if (listUser.lenght === 0) {
            return res
                .status(httpStatus.NO_CONTENT).send();
        }
        const listUser_return = listUser.map((a) => {
            const json = a.toJSON();
            delete json.password;
            delete json.access_tokens;
            return json;
        })
        return res.status(httpStatus.OK).send(new ResponseObject("Get Data Success", listUser_return));
    } catch (err) {
        next(err)
    }
}

userController.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate("role");
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send(new ResponseObject("Cannot User with ID = " + id));
        } else {
            const user_return = user.toJSON();
            delete user_return.password;
            delete user_return.access_tokens;
            return res.status(httpStatus.OK).send(new ResponseObject("Get Data Success", user_return));
        }
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(httpStatus.NOT_FOUND).send(new ResponseObject('Invalid user ID'));
        }
        next(err);
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

userController.deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send(new ResponseObject("Cannot User with ID = " + id));
        } else {
            await user.deleteOne();
            return res.status(httpStatus.OK).send(new ResponseObject("Delete Success"));
        }
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(httpStatus.NOT_FOUND).send(new ResponseObject('Invalid user ID'));
        }
        next(err);
    }
}

userController.get_me = async (req, res, next) => {
    try {
        const me = await User.findOne({ email: req.data.email });
        if (!me)
            return res
                .status(httpStatus.NOT_FOUND)
                .send(new ResponseObject("Not found user"));
        const { password, access_tokens, ...dataRes } = me._doc;
        return res
            .status(httpStatus.OK)
            .send(new ResponseObject("get data success", dataRes));
    } catch (error) {
        next(error);
    }
}


module.exports = userController;