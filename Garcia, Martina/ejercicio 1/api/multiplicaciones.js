import express from "express";

export const multiplicacionesRouter = express.Router()

let multiplicaciones = []
let multiplicacionesMaxId = 0

multiplicacionesRouter.get("/", (req, res) => {
  res.send({ multiplicaciones })
})

multiplicacionesRouter.get("/:id", (req, res) => {
  const id = req.params.id

  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id)

  res.send({ multiplicacion })
})

multiplicacionesRouter.post("/", (req, res) => {
  const { a, b } = req.body
  const multiplicacion = { id: ++multiplicacionesMaxId, a, b, resultado: a * b, fecha: new Date() }
  multiplicaciones.push(multiplicacion)
  res.status(201).send({ multiplicacion })
})


multiplicacionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { a, b } = req.body
  const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() }
  multiplicaciones = multiplicacion.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion))
  res.status(200).send({ multiplicacion: multiplicacionModificada })
})

multiplicacionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  multiplicaciones = multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id)
  res.status(200).send({ id })
})