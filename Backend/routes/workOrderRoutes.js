const express = require("express");
const router = express.Router();
const workOrderController = require("../controllers/workOrderController");

// Ruta para obtener los detalles de la orden de trabajo
router.get("/workOrder/:codigo", workOrderController.getWorkOrderDetails);

module.exports = router;
