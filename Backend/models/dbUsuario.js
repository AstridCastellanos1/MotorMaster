const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    usu_nombre: { type: String, required: true }, // Asegúrate de incluir los campos necesarios
    // Agrega otros campos según sea necesario
  },
  { collection: "trf_usuario" }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = { Usuario };
