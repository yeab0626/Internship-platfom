const internshipService = require("../services/internship.service");
const companyService = require("../services/company.service");

async function createInternship(req, res) {

    try {

        const {
            title,
            description,
            location,
            internship_type,
            duration,
            requirements,
            application_deadline,
        } = req.body;

        const company = await companyService.getCompanyByUserId(
                req.user.user_id
              );

         if (!company) {
              return res.status(404).json({
                 success: false,
                 message: "Company profile not found"
            });
          }

        const company_id = company.company_id;

        const internshipId = 
        await internshipService.createInternship({
            company_id,
            title,
            description,
            location,
            internship_type,
            duration,
            requirements,
            application_deadline
        });

        return res.status(201).json({
            success: true,
            internshipId,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create internship",
        });
   }
}

async function getAllInternships(req, res) {
    try {

        const internships = await internshipService.getInternships();

        res.status(200).json({
            success: true,
            internships,
        });
    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve internships",
        });
    }
}

async function getInternshipById(req, res) {

    try {

        const internship = await internshipService.getInternshipById(req.params.id);

        if (!internship) {

            return res.status(404).json({
                success: false,
                message: "Internship not found",
            });
        }
        
        return res.status(200).json({
            success: true,
            internship,
        });
    }catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Failed to retrieve internship",
            });
        }
    }


async function getAllInternships(req, res) {

    try {

        const internships = await internshipService.getAllInternships();

        return res.status(200).json({
            success: true,
            internships,
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve internships",
        });
    }
}

async function searchInternships(req, res) {

    try {

        const { keyword } = req.query;

        const internships = await internshipService.searchInternships(keyword);

         return res.status(200).json({
            success: true,
            internships,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Search failed",
        });
    }
}
    

module.exports = {
    createInternship,
    getAllInternships,
    getInternshipById,
    searchInternships,
};