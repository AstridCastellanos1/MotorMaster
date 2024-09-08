const app = require("./app");
const port = 3000;
const connectDB = require("./config/db"); // Asegúrate de importar la función de conexión

// Conectar a la base de datos
connectDB();

app.listen(port, () => {
  console.log(`Backend ejecutándose en http://localhost:${port}`);
});
