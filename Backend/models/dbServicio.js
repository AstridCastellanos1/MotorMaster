const mongoose = require("mongoose");

const servicioSchema = new mongoose.Schema({
    ser_codigo: { type: Number, required: true, unique: true },
    ser_nombre: { type: String, required: true },
    // Agrega aquí otros campos necesarios para el servicio
}, { collection: "trf_servicio" }); // Asegúrate de que la colección sea la correcta

const Servicio = mongoose.model("Servicio", servicioSchema);

module.exports = { Servicio };
