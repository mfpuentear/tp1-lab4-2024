import express from "express";

export const tareasRoute = express.Router();

let tareas = [];

tareasRoute.get("/", (req, res) => {
  return res.json({ data: tareas });
});

tareasRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const tareaEncontrado = tareas.find((tare) => tare.id === parseInt(id));

  if (!tareaEncontrado) {
    return res.status(404).send({ mensaje: "tarea no encontrado" });
  }

  return res.json({ data: tareaEncontrado });
});

tareasRoute.post("/", (req, res) => {
  const { nombre } = req.body;
  const nombrecomp = tareas.find((tare) => tare.nombre === nombre);

  if (nombrecomp) {
    return res.status(400).send({ mensaje: "la tarea ya existente" });
  }

  const nuevoId = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
  const nuevotarea = { id: nuevoId, nombre, completada: false };
  tareas.push(nuevotarea);

  return res.status(201).json({ data: nuevotarea });
});

tareasRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter((tare) => tare.id !== parseInt(id));

  return res.status(202).send({ id });
});

tareasRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completada } = req.body;
  const tarea = tareas.find((tare) => tare.id === parseInt(id));

  if (!tarea) {
    return res.status(404).send({ mensaje: "tarea no encontrada" });
  }
  tarea.completada = completada;

  return res.status(200).json({ data: tarea });
});