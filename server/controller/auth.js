const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const User = require("../models/user");
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
                //Tạo Token Add vào DB và return
            }
        }

    } catch (err) {
        next(err);
    }
}

authController.logout = async (req, res, next) => {

}



module.exports = authController;
