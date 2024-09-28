import express from "express"

const router = express.Router()
let sumas = []
let id = 0

router.get("/", (req, res) => {
  res.status(201).json(sumas)
})

router.post("/", (req, res) => {
  const { num1, num2 } = req.body
  const nuevaSuma = {
    id,
    num1,
    num2,
    resultado: num1 + num2,
  }
  sumas.push(nuevaSuma)
  res.status(201).json(nuevaSuma)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { num1, num2 } = req.body
  res.status(201).json({ resultado: num1 + num2 })
  sumas[id].num1 = num1
  sumas[id].num2 = num2
  sumas[id].resultado = num1 + num2
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
