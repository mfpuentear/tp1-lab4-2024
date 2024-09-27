import express from "express";

const router = express.Router();

let tareas = [
  { id: 1, nombre: "Hacer ejercicio", completada: false, fecha: new Date() },
  { id: 2, nombre: "Estudiar", completada: false, fecha: new Date() },
  { id: 3, nombre: "Cocinar", completada: true, fecha: new Date() },
  { id: 4, nombre: "Pasear al perro", completada: false, fecha: new Date() },
];
let tareasIdMax = 4;

// GET /tareas
router.get("/", (req, res) => {
  res.send({ data: tareas });
});

// POST /tareas
router.post("/", (req, res) => {
  const { nombre, completada } = req.body;

  if (nombre == null || completada == null) {
    return res.status(400).send({ error: "Debe ingresar un nombre" });
  }

  if (
    tareas.some(
      (tarea) =>
        tarea.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    )
  ) {
    return res
      .status(400)
      .send({ error: "Este nombre ya está utilizado por otra tarea" });
  }

  const nuevaTarea = {
    id: ++tareasIdMax,
    nombre,
    completada: completada || false,
    fecha: new Date(),
  };
  tareas.push(nuevaTarea);
  res.status(201).send({ data: nuevaTarea });
});

// PUT /tareas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, completada } = req.body;

  if (nombre == null || completada == null) {
    return res.status(400).send({ error: "Faltan datos" });
  }

  // si el el nombre es igual pero la id no, da error
  //(permite el valor repetido para el edición)
  if (
    tareas.some(
      (tarea) =>
        tarea.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
        tarea.id !== id
    )
  ) {
    return res
      .status(400)
      .send({ error: "Este nombre ya está utilizado por otra tarea" });
  }

  const tareaModificada = {
    id,
    nombre,
    completada,
    fecha: new Date(),
  };

  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));

  res.status(200).send({ data: tareaModificada });
});

// DELETE /tareas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});

export default router;
