const fs = require("fs");
const path = require("path");
const { query } = require("../config/db.config");

async function installDatabase() {
    try {

        const filePath = path.join(__dirname, "../sql/create_tables.sql");
        const sql = fs.readFileSync(filePath, "utf8");
       
        const queries = sql.split(";").filter(q => q.trim());

        for (const q of queries) {
            await query(q);
        }

        return {
        success: true,
        message: "Database installed successfully",
    };

} catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to install database",
        };
    }
}

module.exports = {
    installDatabase,
};