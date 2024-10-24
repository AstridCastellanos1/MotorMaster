const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema(
  {
    otr_codigo: { type: Number, required: true, unique: true },
    otr_presupuesto: { type: Number, required: true },
    otr_costo_actual: { type: Number, required: true },
    otr_fecha_creacion: { type: Date, required: true },
    cli_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true }, 
    veh_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo", required: true }, 
    usu_creador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, 
    usu_id_responsable: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, 
    ser_id: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }, 
    mve_id: { type: mongoose.Schema.Types.ObjectId, ref: "MarcaVehiculo" }, 
    otr_fecha_cierre: { type: Date, required: true },
    otr_descripcion: { type: String, required: true },
    otr_solution: { type: String } ,
    otr_estado: { type: String, required: true },
  },
  { collection: "trf_orden_trabajo" }
);

const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);

module.exports = { WorkOrder };
