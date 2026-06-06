const express = require("express");
const cors = require("cors");

const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
    res.status(200).json({ 
        sucess : true,
        message : "Internship Platform API Running",
    });
});

module.exports = app;