import express from "express";

export const tareasRouter = express.Router()

let tareas = [];
let tareasMaxId = 0;

// GET /tareas
tareasRouter.get("/", (req, res) => {
  res.send({ tareas });
});

// GET /tareas/:id
tareasRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == id);
  res.send({ tarea });
});

// POST /tareas
tareasRouter.post("/", (req, res) => {
  const { task, completada } = req.body;
  const existe = tareas.some((tarea) => tarea.task === task);
  if (existe) {
    return res.status(400).send({ mensaje: "No se puede agregar la misma tarea" });
  }
  if (typeof completada !== "boolean") {
    return res.status(400).send({ mensaje: "El completada debe ser positivo" });
  }
  const tarea = { id: ++tareasMaxId, task, completada };
  tareas.push(tarea);
  res.status(201).send({ tarea });
});

// PUT /tareas/:id
tareasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completada } = req.body;

  const tareaModificada = { id, task, completada  };

  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));
  res.status(200).send({ tarea: tareaModificada });
});

// DELETE /tareas/:id
tareasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});
