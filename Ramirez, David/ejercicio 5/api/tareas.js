import express from "express";

const router = express.Router();


let tareas = [
  { id: 0, task: "estudiar", completada: true },
  { id: 1, task: "leer", completada: false },
  { id: 2, task: "codear", completada: true },
];

let tareasMaxId = 0;

// GET lista de tareas.
router.get("/", (req, res) => {
  res.send({ tareas });
});

// GET tarea por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == id);
  res.send({ tarea });
});

// POST nueva tarea
router.post("/", (req, res) => {
  const { task, completada } = req.body;

  const existe = tareas.some((tarea) => tarea.task === task);
  if (existe) {
    return res.status(400).send({ mensaje: "No se puede agregar la misma tarea" });
  }

  if (typeof completada !== "boolean") {
    return res.status(400).send({ mensaje: "El campo 'completada' debe ser True o False" });
  }

  // Agrega la nueva tarea al arreglo
  const tarea = { id: ++tareasMaxId, task, completada };
  tareas.push(tarea);
  res.status(201).send({ tarea });
});

// PUT Modifica una tarea
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completada } = req.body;

  if (typeof completada !== "boolean") {
    return res.status(400).send({ mensaje: "El campo 'completada' debe ser True o False" });
  }

  // Modifica la tarea
  const tareaModificada = { id, task, completada };
  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));
  res.status(200).send({ tarea: tareaModificada });
});

// DELETE Elimina una tarea por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});

export default router;
