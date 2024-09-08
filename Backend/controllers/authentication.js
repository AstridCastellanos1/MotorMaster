const User = require("../models/dbUser");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ usu_usuario: usuario });

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
    console.log("Autenticación exitosa");
    res.json({ success: true, usuario });
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    res.json({
      success: false,
      message: "Error en el proceso de autenticación",
    });
  }
};
