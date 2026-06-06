const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", verifyToken,  (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

router.get("/student-dashboard", verifyToken, requireRole("student"), 
(req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome  student ",
    });
    
});

router.get("/company-dashboard", verifyToken, requireRole("company"),
(req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome company ",
    });
}
);

router.get("/admin-dashboard", verifyToken, requireRole("admin"),
     (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome admin Dashboard",
    });
}
);


module.exports = router;