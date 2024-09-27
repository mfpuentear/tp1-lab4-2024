import express from "express";

export const restasRouter = express.Router()

let restas = []
let restasMaxId = 0

restasRouter.get("/", (req, res) => {
  res.send({ restas })
})

restasRouter.get("/:id", (req, res) => {
  const id = req.params.id

  const resta = restas.find((resta) => resta.id == id)

  res.send({ resta })
})

restasRouter.post("/", (req, res) => {
  const { a, b } = req.body
  const resta = { id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date() }
  restas.push(resta)
  res.status(201).send({ data: resta })
})


restasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { a, b } = req.body
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() }
  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta))
  res.status(200).send({ resta: restaModificada })
})

restasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  restas = restas.filter((resta) => resta.id !== id)
  res.status(200).send({ id })
})