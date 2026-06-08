const { query } = require("../config/db.config");

async function createInternship(data) {

    const sql = `
        INSERT INTO internships (
            company_id, title, description, location, duration, requirements, application_deadline)
          VALUES (?, ?, ?, ?, ?, ?, ?)`;

          const result = await query(sql, [
            data.company_id,
            data.title,
            data.description,
            data.location,
            data.duration,
            data.requirements,
            data.application_deadline,
        ]);

    return result.insertId;
}

async function getInternships() {
    const sql = `SELECT
         i.*,
         c.company_name,
         c.industry,
         c.website

       FROM internships i

       JOIN companies c
       ON i.company_id = c.company_id

       ORDER BY i.created_at DESC
      `;

        return await query(sql);
}

async function getInternshipById(id) {

   const sql = `SELECT
               i.*,
               c.company_name,
               c.industry,
               c.website,
               c.location AS company_location

             FROM internships i

             JOIN companies c
             ON i.company_id = c.company_id

             WHERE i.internship_id = ?
             `;

    const rows = await query(sql, [id]);

    return rows[0];
}

async function getAllInternships(){

   const sql = ` SELECT
            i.*,
            c.company_name,
            c.industry,
            c.website

        FROM internships i

        JOIN companies c
        ON i.company_id = c.company_id

        ORDER BY i.created_at DESC
    `;
    return await query(sql);
}

async function searchInternships(keyword) {

    const sql = `SELECT * FROM internships WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC`;

    return await query(sql, 
        [`%${keyword}%`, `%${keyword}%`]);
}

async function getInternshipOwner(internshipId){

    const sql = ` SELECT company_id FROM internships WHERE internship_id = ?`;
    const rows = await query (sql, [internshipId]);
    

    return rows[0];
}

module.exports = {
    createInternship,
    getInternships,
    getInternshipById,
    getAllInternships,
    searchInternships,
    getInternshipOwner,
};