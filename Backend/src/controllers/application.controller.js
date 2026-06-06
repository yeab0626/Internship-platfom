const applicationService = require("../services/application.service");

async function applyToInternship(req, res) {

    try {
          const { internship_id, cover_letter } = req.body;
        
          const student_id = req.user.user_id;
          const applicationId = await applicationService.createApplication({
              internship_id,
              student_id,
              cover_letter,
          });

           return res.status(201).json({
              success: true,
              applicationId,
           });
        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Failed to submit application",
            });
        }
}

async function getApplicantsByInternship(req, res) {

    try {
       
         const applicants = await applicationService.getApplicantsByInternship(
            req.params.internshipId
          );

          return res.status(200).json({
            success: true,
            applicants,
          });
        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Failed to retrieve applicants",
            });
        }
}

async function updateStatus(req, res) {

    try {
      
        const { status } = req.body;
        const affectedRows = await applicationService.updateApplicationStatus(
            req.params.applicationId,
            status
        );

        if (!affectedRows) {

            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "status updated successfully",
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update application status",
        });
    }
}




module.exports = {
    applyToInternship,
    getApplicantsByInternship,
    updateStatus,
};