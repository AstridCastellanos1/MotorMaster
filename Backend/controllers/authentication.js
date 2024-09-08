exports.login = (req, res) => {
  const { usuario, password } = req.body;

  // Validar credenciales
  if (usuario === "Astrid" && password === "123") {
    res.json({ success: true, usuario });
  } else {
    res.json({ success: false, message: "Credenciales incorrectas" });
  }
};
