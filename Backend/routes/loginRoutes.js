const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

// Ruta para el login
router.post("/login", authentication.login);

module.exports = router;
