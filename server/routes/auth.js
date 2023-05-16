var express = require('express');
const authController = require('../controller/auth');
var router = express.Router();

router.post("/login", authController.login);

module.exports = router;
