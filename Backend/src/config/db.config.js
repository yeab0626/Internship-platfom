const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verify database connection
async function connectDB() {
  try {
    const connection = await pool.getConnection();

    console.log("Database Connected Successfully");

    connection.release();
  } catch (error) {
    console.error("Database Connection Failed");
    throw error;
  }
}

// Query Helper
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function execute(sql){
  const [result] = await pool.execute(sql);
  return result;
}

module.exports = {
  connectDB,
  query,
  execute,
};