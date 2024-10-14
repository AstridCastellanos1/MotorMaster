const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    cli_codigo: { type: Number, required: true },
    cli_nombre: { type: String, required: true },
    cli_DPI: { type: String, required: true },
    cli_correo: { type: String, required: true },
    cli_nit: { type: Number, required: true },
    cli_telefono: { type: Number, required: true },
  },
  { collection: "trf_cliente" }
);

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = { Cliente };
