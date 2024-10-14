const mongoose = require("mongoose");

const marcaVehiculoSchema = new mongoose.Schema(
  {
    mve_codigo: { type: Number, required: true, unique: true },
    mve_nombre: { type: String, required: true },
  },
  { collection: "trf_marca_vehiculo" }
);

const MarcaVehiculo = mongoose.model("MarcaVehiculo", marcaVehiculoSchema);

module.exports = { MarcaVehiculo };
