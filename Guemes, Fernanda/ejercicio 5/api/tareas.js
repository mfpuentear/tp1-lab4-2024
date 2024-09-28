import express from "express"

const router = express.Router()
let tareas = []
let id = 0

router.get("/", (req, res) => {
  res.json(tareas)
})

router.post("/", (req, res) => {
  const { nombre, completado } = req.body

  if (!nombre) {
    res.status(200).json({ error: "La tarea debe tener un nombre" })
    return
  }

  if (tareas.some((tarea) => tarea.nombre === nombre)) {
    res.status(200).json({ error: "Ya existe una tarea con el mismo nombre" })
    return
  }

  const tarea = {
    id,
    nombre,
    completado
  }

  tareas.push(tarea)
  res.status(201).json(tarea)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { nombre, completado } = req.body

  const tarea = tareas.find((t) => t.id === id)
  if (!tarea) {
    res.status(404).json({ error: "Tarea no encontrada" })
    return
  }

  if (!nombre) {
    res.status(400).json({ error: "La tarea debe tener un nombre" })
    return
  }

  if (tareas.some((tarea) => tarea.nombre === nombre && tarea.id !== id)) {
    res.status(400).json({ error: "Ya existe una tarea con el mismo nombre" })
    return
  }

  tarea.nombre = nombre
  tarea.completado = completado
  res.json(tarea)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = tareas.findIndex((t) => t.id === id)
  if (index === -1) {
    res.status(404).json({ error: "Tarea no encontrada" })
    return
  }
  tareas.splice(index, 1)
  res.sendStatus(204)
})

export default router
