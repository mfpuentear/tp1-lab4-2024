import express from "express";

const router = express.Router();

let tareas = [
  // { id: 0, task: "pintar", completada: true},
  // { id: 2, task: 6, completada: 81, resultado: 87 },
  // { id: 5, task: 12, completada: 55, resultado: 87 },
];
let tareasMaxId = 0;

// GET /tareas
router.get("/", (req, res) => {
  res.send({ tareas });
});

// GET /tareas/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la tarea con id de la ruta
  const tarea = tareas.find((tarea) => tarea.id == id);

  // Devuelvo la tarea encontrada
  res.send({ tarea });
});

// POST /tareas
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completada } = req.body;

  const tareaModificada = { id, task, completada  };

  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));
  res.status(200).send({ tarea: tareaModificada });
});

// DELETE /tareas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});

export default router;