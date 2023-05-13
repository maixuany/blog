const httpStatus = require('http-status');
const Role = require('../models/role');
const ResponseObject = require('../models/response');
const { default: mongoose } = require('mongoose');
const roleController = {};

roleController.create = async (req, res, next) => {
    try {
        const { role_id, name } = req.body;
        const role = new Role({ role_id, name });
        await role.save();
        return res.status(httpStatus.CREATED).send(role);
    } catch (err) {
        next(err);
    }
}

roleController.deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(httpStatus.NOT_FOUND).send(new ResponseObject("Cannot Role with ID = " + id));
        } else {
            await role.deleteOne();
            return res.status(httpStatus.OK).send(new ResponseObject("Delete Success"));
        }
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(httpStatus.NOT_FOUND).send(new ResponseObject('Invalid role ID'));
        }
        next(err);
    }
}

roleController.getAll = async (req, res, next) => {
    try {
        const listRole = await Role.find();
        if (listRole.lenght === 0) {
            return res
                .status(httpStatus.NO_CONTENT).send();
        }
        return res.status(httpStatus.OK).send(listRole);
    } catch (err) {
        next(err)
    }
}

module.exports = roleController;