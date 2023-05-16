var express = require('express');
const roleRouter = require("./role");
const userRouter = require("./user");
const authRouter = require("./auth");
var router = express.Router();

router.use("/role", roleRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
