const { WorkOrder } = require("../models/dbWorkOrder");
const { Usuario } = require("../models/dbUsuario");
const { Cliente } = require("../models/dbCliente"); 
const { Vehiculo } = require("../models/dbVehiculo"); 
const { MarcaVehiculo } = require("../models/dbMarcaVehiculo"); 
const { Servicio } = require("../models/dbServicio");

exports.getWorkOrderDetails = async (req, res) => {
  const { codigo } = req.params;

  try {
    // Buscar la orden de trabajo por su código
    const workOrder = await WorkOrder.findOne({ otr_codigo: codigo })
      .populate('cli_id')
      .populate({
        path: 'veh_id',
        populate: { path: 'mve_id' }
      })
      .populate('usu_creador usu_id_responsable ser_id');

    if (!workOrder) {
      return res.status(404).json({ success: false, message: "Orden de trabajo no encontrada" });
    }

    // Extracción de los datos relacionados
    const creatorName = workOrder.usu_creador ? workOrder.usu_creador.usu_nombre : 'Desconocido';
    const clientName = workOrder.cli_id ? workOrder.cli_id.cli_nombre : 'Cliente no encontrado';
    const clientCode = workOrder.cli_id ? workOrder.cli_id.cli_codigo : 'Código no disponible'; // Agregado
    const clientEmail = workOrder.cli_id ? workOrder.cli_id.cli_correo : 'Correo no disponible';
    
    const vehiclePlate = workOrder.veh_id ? workOrder.veh_id.veh_placa : 'Placa no encontrada';
    const vehicleBrand = workOrder.veh_id && workOrder.veh_id.mve_id ? workOrder.veh_id.mve_id.mve_nombre : 'Marca no encontrada';

    const responsibleName = workOrder.usu_id_responsable ? workOrder.usu_id_responsable.usu_nombre : 'Responsable no encontrado';
    const responsibleCode = workOrder.usu_id_responsable ? workOrder.usu_id_responsable.usu_codigo : 'Código no disponible'; // Agregado

    // Preparar los datos para enviar al frontend
    const workOrderDetails = {
      creatorName,
      creationDate: workOrder.otr_fecha_creacion.toISOString().split('T')[0], // Solo la fecha
      expectedCost: workOrder.otr_presupuesto,
      currentCost: workOrder.otr_costo_actual,
      description: workOrder.otr_descripcion || 'No hay descripción disponible.',
      solution: workOrder.otr_solucion || '',
      status: workOrder.otr_estado || 'Estado no disponible',  
      clientName,
      clientCode, 
      clientEmail,
      service: workOrder.ser_id ? workOrder.ser_id.ser_nombre : 'Servicio no implementado aún',
      plate: vehiclePlate,
      brand: vehicleBrand,
      responsibleName,
      responsibleCode 
    };

    // Enviar respuesta al frontend con los datos de la orden de trabajo
    res.json({ success: true, data: workOrderDetails });
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error al obtener la orden de trabajo" });
  }
};

