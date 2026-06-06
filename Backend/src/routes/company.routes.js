const express = require("express");
const router = express.Router();

const companyController = require("../controllers/company.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");


router.post("/profile", verifyToken, requireRole("company"), companyController.createCompanyProfile);

router.get("/:companyId", companyController.getCompanyProfile);


module.exports = router;