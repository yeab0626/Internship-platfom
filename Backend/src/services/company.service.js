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

module.exports ={
    createCompanyProfile,
    getCompanyProfile,
    getCompanyByUserId,
};