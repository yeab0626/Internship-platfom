const bcrypt = require("bcrypt");
const { query } = require("../config/db.config");

async function checkIfUserExists(email) {
   return await query(
    "SELECT * FROM users WHERE email = ?", [email]);
}

async function createUser(userData) {
    const { 
        full_name,
        email,
        password,
        role,
        } = userData;

        // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await query(
    `INSERT INTO users 
    (full_name, email, password, role)
    VALUES (?, ?, ?, ?)`,
    [full_name, email, hashedPassword, role]
    );

    return {
        user_id: result.insertId,
        full_name,
        email,
        role,
    }; 
    }

async function getUserByEmail(email) {
    const users = await query(
        "SELECT * FROM users WHERE email = ?", 
        [email]
    );

    return users[0];
}

module.exports = {
    checkIfUserExists,
    createUser,
    getUserByEmail,
};