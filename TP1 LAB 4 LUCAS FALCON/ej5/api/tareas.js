import express from "express"

const router = express.Router();

let tareas = [
  { id: 1, nombre: "Limpiar", tareaCompletada: true },
  { id: 2, nombre: "Sacar la basura", tareaCompletada: true},
  { id: 3, nombre: "Regar", tareaCompletada: false},
];
let tareaMaxId = tareas.length;

router.get("/", (req, res) => {
  res.send({ tareas });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const tarea = tareas.find((tarea) => tarea.id == id);

  res.send({ tarea });
});

router.post("/", (req, res) => {
  const nombre = req.body.nombre;
  const tareaCompletada = req.body.tareaCompletada;

  const existeTarea = tareas.some((tarea)=>tarea.nombre == nombre)
  if (existeTarea) {
    res.status(400).send({mensaje:"El nombre de la tarea ya existe"})
    return
  }

  const tarea = { id: ++tareaMaxId, nombre, tareaCompletada, fecha: new Date() };
  tareas.push(tarea);
  res.status(201).send({ tarea });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, tareaCompletada } = req.body;
  
  const existeTarea = tareas.some((tarea)=>tarea.nombre == nombre)
  if (existeTarea) {
    res.status(400).send({mensaje:"El nombre de la tarea ya existe"})
    return
  }
  
  const tareaModificada = { id, nombre, tareaCompletada, fecha: new Date()};
  
  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));
  res.status(200).send({ tarea: tareaModificada });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});

export default router;