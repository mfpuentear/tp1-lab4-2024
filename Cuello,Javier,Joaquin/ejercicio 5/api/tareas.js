import express from 'express';

const router = express.Router();
let tareas = [];
let id = 0;

const tareaDuplicada = (nombre) => {
  return tareas.some(tarea => tarea.nombre.toLowerCase() === nombre.toLowerCase());
};


router.get('/', (req, res) => {
  res.json(tareas);
});

router.post('/', (req, res) => {
  const { nombre, completada } = req.body;

  if (tareaDuplicada(nombre)) {
    console.log(`La tarea "${nombre}" ya existe`);
    return res.status(400).json({ error: 'La tarea ya existe' });
  }

  const nuevaTarea = {
    id: id++,
    nombre,
    completada: completada || false,
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { completada } = req.body;

  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tarea.completada = completada;
  res.json(tarea);
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.status(204).send();
});

export default router;
