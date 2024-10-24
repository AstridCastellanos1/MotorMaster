const { WorkOrder } = require("../models/dbWorkOrder");
const { Usuario } = require("../models/dbUsuario");
const { Cliente } = require("../models/dbCliente"); 
const { Vehiculo } = require("../models/dbVehiculo"); 
const { MarcaVehiculo } = require("../models/dbMarcaVehiculo"); 
const { Servicio } = require("../models/dbServicio");


// Buscar una orden de trabajo existente
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

    // Obtener todos los usuarios con su código y nombre
    const users = await Usuario.find({}, { usu_codigo: 1, usu_nombre: 1 });

    const services = await Servicio.find({}, { ser_codigo: 1, ser_nombre: 1 });
    //console.log("Usuarios obtenidos:", users); // Para verificar en la consola

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
      serviceCode: workOrder.ser_id ? workOrder.ser_id.ser_codigo : 'Servicio no implementado aún',
      plate: vehiclePlate,
      brand: vehicleBrand,
      responsibleName,
      responsibleCode,
      users,
      services
    };

    // Enviar respuesta al frontend con los datos de la orden de trabajo
    res.json({ success: true, data: workOrderDetails });
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error al obtener la orden de trabajo" });
  }
  
};


// Modificar una orden de trabajo existente
exports.updateWorkOrder = async (req, res) => {
  try {
    const { caseCode, solution, status, responsibleCode, service } = req.body;
    
    // Buscar al responsable por su código
    const usuarioResponsable = await Usuario.findOne({ usu_codigo: responsibleCode });
    if (!usuarioResponsable) {
      return res.status(404).json({ success: false, message: 'Responsable no encontrado' });
    }
    const responsableId = usuarioResponsable._id; // Esto toma solo el ObjectId

    // Buscar el servicio por su código
    const servicioC = await Servicio.findOne({ ser_codigo: service });
    if (!servicioC) {
      return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    }
    const servicioId = servicioC._id; 

    const ordenEncontrada = await WorkOrder.findOne({ otr_codigo: caseCode })
    
    console.log({
      responsableId,
      servicioId,
      solution,
      status
    });
    // Actualizar la orden de trabajo por su código
    const ordenActualizada = await WorkOrder.findOneAndUpdate(
      { otr_codigo: caseCode }, // Asegúrate de que esto esté correcto
      {
        usu_id_responsable: responsableId,
        ser_id: servicioId,
        otr_solucion: solution,
        otr_estado: status,
      },
      { new: true } // Retornar el documento actualizado
    );

    if (!ordenActualizada) {
      return res.status(404).json({ success: false, message: 'Orden de trabajo no encontrada' });
    }

    res.status(200).json({
      success: true,
      message: 'Orden de trabajo actualizada exitosamente',
      data: ordenActualizada
    });
  } catch (error) {
    console.error("Error al actualizar la orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error al actualizar la orden de trabajo" });
  }
};




