const internshipService = require ("../services/internship.service");
const companyService = require("../services/company.service");

async function verifyCompanyOwnership(req, res, next) {
    
    try {
        const internshipId = req.params.internshipId;

        const internship = await internshipService.getInternshipOwner(internshipId);

        if(!internship){
            return res.status(404).json({
                success : false,
                message: "Internship not found",
            });
        }

        const company = await companyService.getCompanyByUserId(req.user.user_id);

        if(!company) {
            return res.status(404).json({
                success: false,
                message: " company profile not found",
            });
        }
         
        if (internship.company_id !== company.company_id) {
            return res.status(403).json({
                success: false,
                message: " Access denied",
            });
        }
           next();

    } catch (error) {
         console.error("Ownership Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: " Ownership verification failed",
        });
    }
}

module.exports = verifyCompanyOwnership;