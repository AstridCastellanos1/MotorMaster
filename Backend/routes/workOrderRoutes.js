const express = require("express");
const router = express.Router();
const workOrderController = require("../controllers/workOrderController");

// Ruta para obtener los detalles de la orden de trabajo
router.get("/workOrder/:codigo", workOrderController.getWorkOrderDetails);

// Ruta para guardar una nueva orden de trabajo
router.put("/workOrder/update", workOrderController.updateWorkOrder);

// Ruta para obtener la lista de usuarios
//router.get("/workOrder/users", workOrderController.getUsersNames); // Agrega esta línea

module.exports = router;


