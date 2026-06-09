const { query } = require ("../config/db.config");

async function createCompanyProfile(companyData) {
     console.log(companyData);
    const sql = `INSERT INTO companies(user_id, company_name, industry, website, location, description)
    VALUES(?,?,?,?,?,?)`;

    const result = await query(sql, [
        companyData.user_id,
        companyData.company_name,
        companyData.industry,
        companyData.website,
        companyData.location,
        companyData.description
    ]);

    return result.insertId;
}

async function getCompanyProfile(companyId) {

    const sql = `
    SELECT * FROM companies WHERE company_id = ?`;

    const rows = await query(sql, [companyId]);

    return rows[0];
}

async function getCompanyByUserId(userId) {

    const sql = `
        SELECT *
        FROM companies
        WHERE user_id = ?
    `;

    const rows = await query(sql, [userId]);

    return rows[0];
}


async function getDashboardStatus(companyId) {

    const sql = ` SELECT COUNT(DISTINCT i.internship_id) AS totalInternships,
    COUNT(a.application_id) AS totalApplicants,
    SUm(
        CASE WHEN a.status = 'ACCEPted' THEN 1 ELSE 0 END ) AS acceptedApplicants,
    SUM(
         CASE WHEN a.status = 'rejected' THEN 1 ELSE 0 END ) AS rejectedApplicants,
    SUM(
         CASE WHEN a.status = 'pending' THEN 1 ELSE 0 END) AS pendingApplicants  FROM internships i
    
    LEFT JOIN applications a ON i.internship_id = a.internship_id
    
    WHERE i.company_id = ?`;

    const rows = await query(sql, [companyId]);
    
    return {
    totalInternships: Number(rows[0].totalInternships),
    totalApplicants: Number(rows[0].totalApplicants),
    acceptedApplicants: Number(rows[0].acceptedApplicants),
    rejectedApplicants: Number(rows[0].rejectedApplicants),
    pendingApplicants: Number(rows[0].pendingApplicants),
  };
}

module.exports ={
    createCompanyProfile,
    getCompanyProfile,
    getCompanyByUserId,
    getDashboardStatus,
};