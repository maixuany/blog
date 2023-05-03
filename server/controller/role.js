const httpStatus = require('http-status');
const Role = require('../models/role');
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