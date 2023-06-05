const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Conexion a base de datos
connection();

// Crear servidor node
const app = express();
const port = 3900;

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar config rutas
const UserRoutes = require("./routes/user");

app.use("/api/user", UserRoutes);

// Poner servidor a escuchart peticiones http
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto:", port);
});
