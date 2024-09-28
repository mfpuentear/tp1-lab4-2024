import express from "express"

const router = express.Router()
let multiplicaciones = []
let id = 0

router.get("/", (req, res) => {
  res.json(multiplicaciones)
})

router.post("/", (req, res) => {
  const { n1, n2 } = req.body

  const nuevaMultiplicacion = {
    id,
    n1,
    n2,
    resultado: n1 * n2,
  }

  multiplicaciones.push(nuevaMultiplicacion)
  res.status(201).json(nuevaMultiplicacion)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { n1, n2 } = req.body
  const multiplicacion = multiplicaciones.find((m) => m.id === id)
  
  if (!multiplicacion) {
    res.status(404).json({ error: "Multiplicacion no encontrada" })
    return
  }

  const multiplicacionModificada = {
    id,
    n1,
    n2,
    resultado: n1 * n2,
  }

  multiplicaciones = multiplicaciones.map((m) => (m.id === id ? multiplicacionModificada : m))
  res.status(201).json(multiplicacionModificada)
})

export default router