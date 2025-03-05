// npm install express cors
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Datos de prueba
let datos = [
  { id: 1, nombre: "Cristian", email: "cristiano@gmail.com" },
  { id: 2, nombre: "Messi", email: "messi@gmail.com" }
];

// GET - Obtener todos los datos
app.get("/data", (req, res) => {
  res.json(datos);
});

// POST - Agregar un nuevo dato
app.post("/data", (req, res) => {
  const nuevoDato = { id: datos.length + 1, ...req.body };
  datos.push(nuevoDato);
  res.json({ status: "Datos guardados!", receivedData: nuevoDato });
});

// PUT - Actualizar un dato por ID
app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = datos.findIndex(d => d.id === id);

  if (index !== -1) {
    datos[index] = { id, ...req.body };
    res.json({ status: "Datos actualizados!", updatedData: datos[index] });
  } else {
    res.status(404).json({ error: "Dato no encontrado" });
  }
});

// DELETE - Eliminar un dato por ID
app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  datos = datos.filter(d => d.id !== id);
  res.json({ status: "Dato eliminado!", id });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
