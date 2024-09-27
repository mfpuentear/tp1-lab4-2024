import express from "express";

export const tareasRouter = express.Router();

let tareas = [{ id: 5, tar: "pintar", est: "completo" }];
let tareasMaxId = 0;

tareasRouter.get("/", (req, res) => {
  res.send({ tareas });
});

tareasRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const tarea = tareas.find((tarea) => tarea.id == id);

  res.send({ tarea });
});

tareasRouter.post("/", (req, res) => {
  const { tar, est } = req.body;

  if (tareas.some((tarea) => tarea.tar === tar)) {
    res.status(400).send({ mensaje: "tarea ya existe." });
  }

  const tarea = {
    id: ++tareasMaxId,
    tar,
    est,
    fecha: new Date(),
  };
  tareas.push(tarea);
  res.status(201).send({ tarea });
});

// PUT /tareas/:id
tareasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { tar, est } = req.body;

  if (tareas.some((tarea) => tarea.tar === tar)) {
    res.status(400).send({ mensaje: "tarea ya existe." });
  }

  const tareaModificada = { id, tar, est, fecha: new Date() };
  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));
  res.status(200).send({ tarea: tareaModificada });
});
// DELETE /tareas/:id
tareasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});
