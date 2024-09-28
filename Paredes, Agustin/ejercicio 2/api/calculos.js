import express, { response } from "express";

const calculosRouter = express.Router()
let calculos = []
let indexx = 0

calculosRouter.get("/", (req, res) => {
    res.json(calculos)
})


calculosRouter.post("/", (req,res) => {
    const {base, altura} = req.body
    
    const perimetro = (base + altura) * 2
    const area = base * altura

    const nuevoCalculo = { indexx : calculos.length, base: base, altura: altura, perimetro: perimetro, area:area }


calculos.push(nuevoCalculo)
indexx++,
res.status(201).json(nuevoCalculo)
})

calculosRouter.put("/:id", (req, res) => {
    const  id  = parseInt(req.params.id)
    const { base, altura} = req.body

    const calculo = calculos.find((e) => e.id === id)

    if (!calculo) {
        return res.status(404).json({Error: "Calculo fallido."})
    }

    calculo.base = base
    calculo.altura = altura
    calculo.perimetro = (base + altura) * 2
    calculo.area = base * altura


    calculos = calculos.map((e) => e.id === id ? calculo : e)

    res.json(calculo)
})

calculosRouter.delete("/:id", (req,res) => {
    const id = parseInt(req.params.id)
    calculos = calculos.filter((e) => e.id !== id)
    res.status(200).send({ mensaje : `El cálculo con id "${id}" fue eliminado.` });})


export default calculosRouter