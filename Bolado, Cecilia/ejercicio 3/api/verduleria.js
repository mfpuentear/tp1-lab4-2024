import express from "express"

const router = express.Router()
let vegetales = []
let id = 0

router.get("/", (req, res) => {
  res.send(vegetales)
})

router.post("/", (req, res) => {
  const { nombre, precio } = req.body

  if (vegetales.some((p) => p.nombre === nombre)) {
    res.send({ error: `Ya existe un vegetal con el nombre ${nombre}` })
    return
  }

  if (precio < 0) {
    res.send({ error: `El precio no puede ser negativo` })
    return
  }

  const nuevoVegetal = {
    id,
    nombre,
    precio,
  }

  vegetales.push(nuevoVegetal)
  res.send(nuevoVegetal).status(201)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { nombre, precio } = req.body

  const vegetal = vegetales.find((p) => p.id === id)
  if (!vegetal) {
    res.status(404).send({ error: "Vegetal no encontrado" })
  }

  if (vegetales.some((p) => p.nombre === nombre && p.id !== id)) {
    res.send({ error: `Ya existe un vegetal con el nombre ${nombre}` })
    return
  }

  if (precio < 0) {
    res.send({ error: `El precio no puede ser negativo` })
    return
  }

  vegetal.nombre = nombre
  vegetal.precio = precio

  vegetales = vegetales.map((p) => (p.id === id ? vegetal : p))

  res.json(vegetal)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)

  const vegetal = vegetales.find((p) => p.id === id)
  if (!vegetal) {
    res.status(404).send({ error: "Vegetal no encontrado" })
  }

  vegetales = vegetales.filter((p) => p.id !== id)
  res.send().status(410)
})

export default router