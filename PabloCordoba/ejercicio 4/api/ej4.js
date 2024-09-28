const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5300
let alumnos = []

app.get('/alumnos', (req, res) => {
  res.json(alumnos)
});

app.post('/alumnos', (req, res) => {
  const {nombre, notas} = req.body

  if (alumnos.some(alumno => alumno.nombre === nombre)) {
    return res.status(400).json({ error: "Ya existe un alumno con ese nombre" });
  }

  
  if (!notas.every(nota => nota >= 0)) {
    return res.status(400).json({ error: "las notas deben ser positivas" });
  }

  alumnos.push({nombre, notas});
  res.status(201).json({ mensaje: "Alumno agregado" });
});

app.put('/alumnos/:nombre', (req, res) => {
  const { nombre } = req.params;
  const { nuevoNombre, notas } = req.body;

  const alumno = alumnos.find(alumno => alumno.nombre === nombre);
  if (!alumno) {
    return res.status(404).json({ error: "alumno no se encontre" });
  }

  
  if (nuevoNombre && alumnos.some(al => al.nombre === nuevoNombre && al.nombre !== nombre)) {
    return res.status(400).json({ error: "Ya existe un alumno con ese nombre" })
  }

  if (!notas.every(nota => nota >= 0)) {
    return res.status(400).json({ error: "Las notas deben ser positivas" });
  }

  alumno.nombre = nuevoNombre || alumno.nombre;
  alumno.notas = notas || alumno.notas;
  res.json({ message: "Alumno actualizado" });
});

app.delete('/alumnos/:nombre', (req, res) => {
  const { nombre } = req.params;
  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  
  if (index === -1) {
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  alumnos.splice(index, 1);
  res.json({ mensaje: "Alumno eliminado" });
});

app.listen(PORT, () => {console.log(`escuchando en el puerto ${PORT}`)

});
