require("dotenv").config();

const app = require("./src/app");
const { connectDB } = require("./src/config/db.config");

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();