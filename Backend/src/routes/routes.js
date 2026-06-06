const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const companyRoutes = require("./company.routes");
const internshipRoutes = require("./internship.routes");
const installRoutes = require("./install.routes");
const applicationRoutes = require("./application.routes");

router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/internships", internshipRoutes);
router.use("/install", installRoutes);
router.use("/applications", applicationRoutes);

module.exports = router;