const { query } = require("../config/db.config");

async function createApplication(data) {

    const sql = ` INSERT INTO applications (
        internship_id, student_id, cover_letter)
        VALUES (?, ?, ?)`;

        const result = await query(sql, [
            data.internship_id,
            data.student_id,
            data.cover_letter,
        ]);
        return result.insertId;
    }

async function getApplicantsByInternship(internshipId) {
    console.log("Internship ID:", internshipId);
    const sql = `SELECT 
          a.application_id,
          a.cover_letter,
          a.status,
          a.applied_at,

          u.user_id,
          u.email

        FROM applications a
        
        JOIN users u ON a.student_id = u.user_id

        WHERE a.internship_id = ?`;

        return await query(sql, [internshipId]);
}

async function updateApplicationStatus(applicationId, status) {

   const sql = `UPDATE applications SET status = ? WHERE application_id = ?`;

   const result = await query(sql, [status, applicationId]);

   return result.affectedRows > 0;
}


module.exports = {
  createApplication,
  getApplicantsByInternship,
  updateApplicationStatus
};
