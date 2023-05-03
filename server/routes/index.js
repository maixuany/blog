var express = require('express');
const roleRouter = require("./role");
var router = express.Router();

router.use("/role", roleRouter);

module.exports = router;
