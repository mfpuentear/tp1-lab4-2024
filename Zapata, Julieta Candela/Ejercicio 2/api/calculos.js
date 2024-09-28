import express from "express"

export const calculosRouter = express.Router()

let calculos = []

let calculosMaxId = 0

// Ruta todos los cálculos.
calculosRouter.get("/", (req, res) => {
  res.send({ calculos })
})

// Ruta por ID.
calculosRouter.get("/:id", (req, res) => {
  const id = req.params.id
  const calculo = calculos.find((calculo) => calculo.id == id)
  res.send({ calculo })
});

// Ruta nuevo rectángulo o cuadrado.
calculosRouter.post("/", (req, res) => {
  const { base, altura } = req.body

  const rectangulo = {
    id: ++calculosMaxId, 
    base,
    altura,
    perimetro: (base + altura) * 2,
    area: base * altura,            
  }

  calculos.push(rectangulo)
  res.status(201).send({ rectangulo })
})

// modificar por ID.
calculosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { base, altura } = req.body
  const calculoModificado = {
    id,
    base,
    altura,
    perimetro: (base + altura) * 2, 
    area: base * altura,            
  }

  calculos = calculos.map((rectangulo) =>
    rectangulo.id === id ? calculoModificado : rectangulo
  )

  res.status(200).send({ rectangulo: calculoModificado });
})

// Ruta eliminar por ID.
calculosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  calculos = calculos.filter((rectangulo) => rectangulo.id !== id)

  res.status(200).send({ id })
})