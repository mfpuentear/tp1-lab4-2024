import express from "express"

const router = express.Router()
let sumas = []
let id = 0

router.get("/", (req, res) => {
  res.status(201).json(sumas)
})

router.post("/", (req, res) => {
  const { n1, n2 } = req.body
  const nuevaSuma = {
    id,
    n1,
    n2,
    resultado: n1 + n2,
  }
  sumas.push(nuevaSuma)
  res.status(201).json(nuevaSuma)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { n1, n2 } = req.body
  res.status(201).json({ resultado: n1 + n2 })
  sumas[id].n1 = n1
  sumas[id].n2 = n2
  sumas[id].resultado = n1 + n2
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const sumas = sumas.filter((s) => s.id !== id)
  if (!sumas) {
    res.status(404).json({ error: "Suma no encontrada" })
    return
  }

  sumas = sumas.filter((s) => s.id !== id)
  res.status(410).send()
})

export default router
