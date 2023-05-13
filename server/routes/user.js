var express = require('express');
const userController = require('../controller/user');
const user = require('../models/user');
var router = express.Router();

router.post("/", userController.register);
router.get("/", userController.getAll);
// router.delete("/:id", roleController.deleteOne);

module.exports = router;
