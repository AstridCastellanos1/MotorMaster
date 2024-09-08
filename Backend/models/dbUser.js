const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    usu_usuario: { type: String, required: true, unique: true },
    usu_contrasena: { type: String, required: true },
  },
  { collection: "trf_usuario" }
); // Especifica el nombre de la colección

const User = mongoose.model("User", userSchema);

module.exports = User;
