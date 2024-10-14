const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    usu_codigo: { type: Number, required: true }, // Agregado
    usu_nombre: { type: String, required: true }, 
  },
  { collection: "trf_usuario" }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = { Usuario };
