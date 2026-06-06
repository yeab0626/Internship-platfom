const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { requireRole }   = require("../middleware/role.middleware");

router.post("/", verifyToken, requireRole("student"), applicationController.applyToInternship);
router.get("/internship/:internshipId", verifyToken, requireRole("company"), applicationController.getApplicantsByInternship); 
router.put("/:applicationId/status", verifyToken, requireRole("company"), applicationController.updateStatus);

module.exports = router;