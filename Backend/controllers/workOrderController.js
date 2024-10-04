const { WorkOrder } = require("../models/dbWorkOrder");
const { User } = require("../models/dbUser");

exports.getWorkOrderDetails = async (req, res) => {
  const { codigo } = req.params;

  try {
    // Buscar la orden de trabajo por su código
    const workOrder = await WorkOrder.findOne({ otr_codigo: codigo }).populate('usu_creador');
    
    if (!workOrder) {
      return res.status(404).json({ success: false, message: "Orden de trabajo no encontrada" });
    }

    // Buscar el creador de la orden en la colección de usuarios
    const creator = await User.findById(workOrder.usu_creador);
    
    // Preparar los datos para enviar al frontend
    const workOrderDetails = {
      creatorName: creator.usu_nombre,
      creationDate: workOrder.otr_fecha_creacion.toISOString().split('T')[0], // Solo la fecha
      expectedCost: workOrder.otr_presupuesto,
      currentCost: workOrder.otr_costo_actual
    };

    res.json({ success: true, data: workOrderDetails });
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error al obtener la orden de trabajo" });
  }
};
