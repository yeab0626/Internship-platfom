const express = require("express");
const router = express.Router();
const installController = require("../controllers/install.controller");

router.get("/", installController.install);
router.post("/", installController.install);

module.exports = router;