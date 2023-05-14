var express = require('express');
const userController = require('../controller/user');
var router = express.Router();

router.post("/", userController.register);
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.delete("/:id", userController.deleteOne);
router.post("/admin", userController.create);

module.exports = router;
