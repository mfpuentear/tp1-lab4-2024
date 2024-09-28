import express from "express"

const router = express.Router()
let divisiones = []
let id = 0

router.get("/", (req, res) => {
  res.json(divisiones)
})

router.post("/", (req, res) => {
  const { n1, n2 } = req.body

  if (n2 === 0) {
    res.status(200).json({ error: "No se puede dividir por cero" })
    return
  }

  const nuevaDivision = {
    id,
    n1,
    n2,
    resultado: n1 / n2,
  }

  divisiones.push(nuevaDivision)
  res.status(201).json(nuevaDivision)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { n1, n2 } = req.body
  const division = divisiones.find((d) => d.id === id)
  if (!division) {
    res.status(404).json({ error: "Division no encontrada" })
    return
  }

  const divisionModificada = {
    id,
    n1,
    n2,
    resultado: n1 / n2,
  }
  divisiones = divisiones.map((d) => (d.id === id ? divisionModificada : d))
  res.json(divisionModificada)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)

  const division = divisiones.find((d) => d.id === id)
  if (!division) {
    res.status(404).json({ error: "Division no encontrada" })
  }

  divisiones = divisiones.filter((d) => d.id !== id)
  res.status(204).send()
})

export default router