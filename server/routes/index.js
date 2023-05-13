var express = require('express');
const roleRouter = require("./role");
const userRouter = require("./user");
var router = express.Router();

router.use("/role", roleRouter);
router.use("/user", userRouter);

module.exports = router;
