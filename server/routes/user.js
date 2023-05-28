var express = require('express');
const userController = require('../controller/user');
const { authentication, authorization } = require("../middlewares/auth");
var router = express.Router();

router.post("/", userController.register);
router.get("/", userController.getAll);
router.get("/me", authentication, userController.get_me);
router.get("/:id", userController.getOne);
router.delete("/:id", userController.deleteOne);
router.post("/admin", userController.create);

module.exports = router;
