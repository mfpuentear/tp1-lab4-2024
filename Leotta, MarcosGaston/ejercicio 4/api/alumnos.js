import express from "express"

const router = express.Router()
let alumnos = []
let id = 0

router.get("/", (req, res) => {
  res.send(alumnos)
})

router.post("/", (req, res) => {
  const { nombre, notas } = req.body

  if (!nombre || !notas || notas.length !== 3) {
    res.status(200).json({ error: "Datos incompletos del alumno" })
    return
  }

  if (alumnos.some((alumno) => alumno.nombre === nombre)) {
    res.status(200).json({ error: "Ya existe un alumno con el mismo nombre" })
    return
  }

  if (alumnos.some((nota) => nota < 0 || nota > 10)) {
    res.status(200).json({ error: "Las notas deben ser entre el 0 y 10" })
    return
  }

  const promedio = notas.reduce((acc, nota) => acc + nota, 0) / notas.length

  const alumno = {
    id,
    nombre,
    notas,
    promedio,
  }

  alumnos.push(alumno)
  res.status(201).json(alumno)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { nombre, notas } = req.body

  const alumno = alumnos.find((a) => a.id === id)
  if (!alumno) {
    res.status(404).json({ error: "Alumno no encontrado" })
    return
  }

  if (!nombre || !notas || notas.length !== 3) {
    res.status(400).json({ error: "Datos incompletos del alumno" })
    return
  }

  if (alumnos.some((a) => a.nombre === nombre && a.id !== id)) {
    res.status(400).json({ error: "Ya existe un alumno con el mismo nombre" })
    return
  }

  if (alumnos.some((nota) => nota < 0)) {
    res.status(400).json({ error: "Las notas deben ser positivas" })
    return
  }

  alumno.nombre = nombre
  alumno.notas = notas
  alumno.promedio = (
    notas.reduce((acc, nota) => acc + nota, 0) / notas.length
  ).toFixed(2)

  alumnos = alumnos.map((a) => (a.id === id ? alumno : a))
  res.json(alumno)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const alumno = alumnos.find((a) => a.id === id)

  if (!alumno) {
    res.status(404).json({ error: "Alumno no encontrado" })
    return
  }

  alumnos = alumnos.filter((a) => a.id !== id)
  res.json({ mensaje: "Alumno eliminado" }).status(410)
})

export default router