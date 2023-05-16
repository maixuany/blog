const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ResponseObject = require("../models/response");

const authentication = async (req, res, next) => {
    if (!req.header("Authorization")) return res.status(httpStatus.UNAUTHORIZED).send(new ResponseObject("Forbidden"));
    const token = req.header("Authorization").replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ email: payload.email });
        if (!user || !user.access_tokens.includes(token))
            return res.status(httpStatus.UNAUTHORIZED).send(new ResponseObject("User token does not exist"));
        req.data = payload;
        req.token = token;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            const expiredToken = token;
            const user = await User.findOneAndUpdate(
                { access_tokens: token },
                { $pull: { access_tokens: token } },
                { new: true }
            );
            if (user) {
                return res.status(httpStatus.UNAUTHORIZED).send(new ResponseObject(
                    `Expired token ${expiredToken} has been removed from user ${user.fullname}`,
                ));
            }
            return res.status(httpStatus.UNAUTHORIZED).send(new ResponseObject(
                `Expired token ${expiredToken} has been removed from user`,
            ));
        }
        next(error);
    }
}

const authorization = async (req, res, next) => {

}

module.exports = { authentication, authorization };
