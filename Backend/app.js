const express = require("express");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Usar las rutas para manejar el login
app.use("/api", loginRoutes);

// Usar las rutas para las órdenes de trabajo
app.use("/api", workOrderRoutes);

module.exports = app;
