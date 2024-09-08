const express = require("express");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Usar las rutas para manejar el login
app.use("/api", loginRoutes);

module.exports = app;
