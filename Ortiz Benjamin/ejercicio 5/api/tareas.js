import express from "express";

export const tareasRouter = express.Router();

let tareas = [];
let tareasMaxId = 0;

tareasRouter.get("/", (req, res) => {
  res.send({ tareas });
});

tareasRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == id);
  if (!tarea) {
    res.status(404).send({ mensaje: "no existe la tarea" });
  }
  res.send({ tarea });
});

tareasRouter.post("/", (req, res) => {
  const { id } = req.body;
  const { nombre } = req.body;
  const tareaRepetida = tareas.find((tarea) => tarea.nombre === nombre);
  if (tareaRepetida) {
    return res.status(400).send({ mensaje: "tarea existente" });
  }

  const tareaNueva = {
    id: ++tareasMaxId,
    nombre,
    completado: false,
  };

  tareas.push(tareaNueva);
  res.status(201).send({ tareaNueva });
});

tareasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { completado } = req.body;

  const tareaId = tareas.findIndex((tarea) => tarea.id === id);

  if (tareaId === -1) {
    return res.status(404).send({ mensaje: "No se encontro la tarea" });
  }

  tareas[tareaId].completado = completado;

  res.status(200).send({ data: tareas[tareaId] });
});

tareasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});
