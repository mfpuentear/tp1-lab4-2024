import express from "express"

const router = express.Router()
let operacion = []
let id = 0

router.get("/", (req, res) => {
  res.json(operacion)
})

router.post("/", (req, res) => {
  const { base, altura } = req.body
  const perimetro = (base*2 + altura*2)
  const area = base * altura
  const calculonuevo = {
    id,
    base: base,
    altura: altura,
    perimetro: perimetro,
    area: area,
  }

  operacion.push(calculonuevo)
  id++
  res.status(201).json(calculonuevo)
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { base, altura } = req.body
  const calculo = operacion.find((c) => c.id === id)
  if (!calculo) {
    res.status(404).json({ error: "No se encontro el calculo" })
    return
  }
  calculo.base = base
  calculo.altura = altura
  calculo.perimetro = (base*2 + altura*2)
  calculo.area = base * altura
  operacion = operacion.map((c) => c.id === id ? calculo : c)
  res.json(calculo)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  operacion = operacion.filter((c) => c.id !== id)
  res.send().status(410)
})
export default router
