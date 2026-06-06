const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internship.controller");

const { verifyToken } = require("../middleware/auth.middleware");
const { requireRole }   = require("../middleware/role.middleware");

// 1. static and specific routes (put these first!)
router.get("/", internshipController.getAllInternships);
router.get("/search", internshipController.searchInternships);

// 2.Dynamic Parameter Routes (put these last! )
router.get("/:id", internshipController.getInternshipById);

// 3. POST Routes
router.post("/", verifyToken, requireRole("company"), internshipController.createInternship);

module.exports = router;