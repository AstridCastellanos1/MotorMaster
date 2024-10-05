const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema(
  {
    otr_codigo: { type: Number, required: true, unique: true },
    otr_presupuesto: { type: Number, required: true },
    otr_costo_actual: { type: Number, required: true },
    otr_fecha_creacion: { type: Date, required: true },
    usu_creador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    otr_descripcion: { type: String, required: true },
    otr_solucion: { type: String } 
  },
  { collection: "trf_orden_trabajo" }
);

const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);

module.exports = { WorkOrder };
