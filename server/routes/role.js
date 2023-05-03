var express = require('express');
const roleController = require('../controller/role');
var router = express.Router();

router.post("/", roleController.create);
router.get("/", roleController.getAll);

module.exports = router;
