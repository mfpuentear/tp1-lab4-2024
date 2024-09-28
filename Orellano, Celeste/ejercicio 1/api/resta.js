import express from "express"

const router = express.Router()
let restas = []
let id = 0

router.get("/", (req, res) => {
  res.status(201).json(restas)
})

router.post("/", (req, res) => {
  const { n1, n2 } = req.body
  
  const nuevaResta = {
    id,
    n1,
    n2,
    resultado: n1 - n2,
  }

  restas.push(nuevaResta)
  res.status(201).json(nuevaResta)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { n1, n2 } = req.body

  const resta = restas.find((r) => r.id === id)
  if (!resta) {
    res.status(404).json({ error: "Resta no encontrada" })
    return
  }

  const restaModificada = {
    id,
    n1,
    n2,
    resultado: n1 - n2,
  }

  restas = restas.map((r) => (r.id === id ? restaModificada : r))
  res.status(201).json(restaModificada)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const resta = restas.find((r) => r.id === id)
  if (!resta) {
    res.status(404).json({ error: "Resta no encontrada" })
    return
  }

  restas = restas.filter((r) => r.id !== id)
  res.status(410).send()
})

export default router