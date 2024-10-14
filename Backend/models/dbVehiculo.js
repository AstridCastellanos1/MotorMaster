const mongoose = require("mongoose");

const vehiculoSchema = new mongoose.Schema(
  {
    veh_codigo: { type: Number, required: true, unique: true },
    veh_vin: { type: String, required: true },
    veh_placa: { type: String, required: true },
    veh_anio_fabricacion: { type: Number, required: true },
    cli_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
    tve_id: { type: mongoose.Schema.Types.ObjectId, ref: "TipoVehiculo", required: true }, 
    mve_id: { type: mongoose.Schema.Types.ObjectId, ref: "MarcaVehiculo", required: true }
  },
  { collection: "trf_vehiculo" }
);

const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);

module.exports = { Vehiculo };
