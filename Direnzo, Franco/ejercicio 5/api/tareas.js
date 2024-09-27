import express from "express";

const router = express.Router();

let tareas = [
];
let tareasMaxId = 0;

// GET 
router.get("/", (req, res) => {
  res.send({ tareas });
});

// GET id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == id);
  res.send({ tarea });
});

// POST 
router.post("/", (req, res) => {
  const { a, b } = req.body;
  if(tareas.filter((e)=>{if(e.a===a){return e}}).length>0){
    res.status(400).send('ERROR')
    return;
  }
  const tarea = { id: ++tareasMaxId, a, b, fecha: new Date() };
  tareas.push(tarea);
  res.status(201).send({ tarea });
});

// PUT 
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  
  if(tareas.filter((e)=>{if(e.a===a && e.id!=id){return e}}).length>0){
    res.status(400).send('ERROR')
    return;
  }

  const tareaModificada = { id, a, b, fecha: new Date() };
  tareas = tareas.map((tarea) => (tarea.id === id ? tareaModificada : tarea));
  res.status(200).send({ tarea: tareaModificada });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter((tarea) => tarea.id !== id);
  res.status(200).send({ id });
});

export default router;
