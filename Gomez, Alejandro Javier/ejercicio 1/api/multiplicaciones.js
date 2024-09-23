import express from "express";

export const multiplicaciones = express.Router();

const listaMultiplicaciones = []
let multiplicacionesId = 0

//Listar todas las multiplicaciones
multiplicaciones.get("/listaMultiplicaciones", (req, res) => {
    res.send(listaMultiplicaciones)
})

//Añadir una resta a listaMultiplicaciones
multiplicaciones.post("/listaMultiplicaciones", (req, res) => {
    const {multiplicando, multiplicador} = req.body
    const multiplicacion = {
        idMultiplicacion: multiplicacionesId++,
        multiplicando: multiplicando,
        multiplicador: multiplicador,
        resultado: (multiplicando * multiplicador)
    }
    listaMultiplicaciones.push(multiplicacion)

    res.status(201).send({data: multiplicacion})
})