const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { requireRole }   = require("../middleware/role.middleware");
const verifyCompanyOwnership = require("../middleware/companyOwnership.middleware");


router.post("/", verifyToken, requireRole("student"), applicationController.applyToInternship);
router.get("/internship/:internshipId", verifyToken, requireRole("company"), verifyCompanyOwnership, applicationController.getApplicantsByInternship); 
router.put("/:applicationId/status", verifyToken, requireRole("company"), applicationController.updateStatus);

module.exports = router;