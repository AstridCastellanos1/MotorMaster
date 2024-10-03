// authentication.js
const { findUserAndLog } = require("../models/dbUser");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Método para encontrar al usuario
    const user = await findUserAndLog(usuario);

    // Verificar si el usuario existe
    if (!user) {
      console.log("Usuario no encontrado");
      return res.json({ success: false, message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    if (user.usu_contrasena !== password) {
      console.log("Contraseña incorrecta");
      return res.json({ success: false, message: "Contraseña incorrecta" });
    }

    // Autenticación exitosa
    console.log("Autenticación exitosa ;)");
    res.json({
      success: true,
      usuario,
      imagen: user.usu_imagen 
    });
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    res.json({
      success: false,
      message: "Error en el proceso de autenticación",
    });
  }
};
