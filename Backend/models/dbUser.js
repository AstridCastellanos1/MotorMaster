const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    usu_usuario: { type: String, required: true, unique: true },
    usu_contrasena: { type: String, required: true },
    usu_imagen: { type: String }
  },
  { collection: "trf_usuario" }
);

const User = mongoose.model("User", userSchema);

// Método para buscar un usuario y mostrar información
const findUserAndLog = async (username) => {
  try {
    const user = await User.findOne({ usu_usuario: username });
    if (user) {
      return user;
    } else {
      console.log("Usuario no encontrado");
      return null; // Usuario no encontrado
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    throw error; // Lanza el error para manejarlo en otro lugar
  }
};

module.exports = { User, findUserAndLog };
