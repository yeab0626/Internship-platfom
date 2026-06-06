const companyService = require("../services/company.service");

async function createCompanyProfile(req, res) {

    try {

         console.log("User:", req.user);
        console.log("Body:", req.body);

        const companyId = await companyService.createCompanyProfile({
            user_id: req.user.user_id,

            company_name: req.body.company_name,
            industry: req.body.industry,
            website: req.body.website,
            location: req.body.location,
            description: req.body.description,

        });

        return res.status(201).json({
            success: true,
            companyId,
        });

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create company profile",
        });
    }
}

async function getCompanyProfile(req, res) {

    try {
        const company = await companyService.getCompanyProfile(
            req.params.companyId
        );

        if(!company) {
            return res.status(404),json({
                success: false,
                message: "company not found"
            });
        }
        return res.status(200).json({
            status: true,
            company
        });
    } catch(error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: " Failed to fetch company profile",
        });
    }
}


module.exports = {
    createCompanyProfile,
    getCompanyProfile,
}