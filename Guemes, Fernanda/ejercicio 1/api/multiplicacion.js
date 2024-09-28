import express from "express"

const router = express.Router()
let multiplicaciones = []
let id = 0

router.get("/", (req, res) => {
  res.json(multiplicaciones)
})

router.post("/", (req, res) => {
  const { num1, num2 } = req.body

  const nuevaMultiplicacion = {
    id,
    num1,
    num2,
    resultado: num1 * num2,
  }

  multiplicaciones.push(nuevaMultiplicacion)
  res.status(201).json(nuevaMultiplicacion)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { num1, num2 } = req.body
  const multiplicacion = multiplicaciones.find((m) => m.id === id)
  
  if (!multiplicacion) {
    res.status(404).json({ error: "Multiplicacion no encontrada" })
    return
  }

  const multiplicacionModificada = {
    id,
    num1,
    num2,
    resultado: num1 * num2,
  }

  multiplicaciones = multiplicaciones.map((m) => (m.id === id ? multiplicacionModificada : m))
  res.status(201).json(multiplicacionModificada)
})

export default router
