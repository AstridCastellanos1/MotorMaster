const { WorkOrder } = require("../models/dbWorkOrder");
const { Usuario } = require("../models/dbUsuario");

exports.getWorkOrderDetails = async (req, res) => {
  const { codigo } = req.params;

  try {
    // Buscar la orden de trabajo por su código
    const workOrder = await WorkOrder.findOne({ otr_codigo: codigo });

    if (!workOrder) {
      return res.status(404).json({ success: false, message: "Orden de trabajo no encontrada" });
    }

    // Buscar el creador en la colección de usuarios utilizando el ObjectId
    const creator = await Usuario.findById(workOrder.usu_creador);
    console.log(creator); // Para verificar el resultado de la búsqueda

    // Verificar si el creador fue encontrado
    const creatorName = creator ? creator.usu_nombre : 'Desconocido';
    console.log(creatorName); // Para verificar el nombre del creador

    // Preparar los datos para enviar al frontend
    const workOrderDetails = {
      creatorName,
      creationDate: workOrder.otr_fecha_creacion.toISOString().split('T')[0], // Solo la fecha
      expectedCost: workOrder.otr_presupuesto,
      currentCost: workOrder.otr_costo_actual,
      description: workOrder.otr_descripcion || 'No hay descripción disponible.', // Descripción
      solution: workOrder.otr_solucion // Solución
    };

    res.json({ success: true, data: workOrderDetails });
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error al obtener la orden de trabajo" });
  }
};
