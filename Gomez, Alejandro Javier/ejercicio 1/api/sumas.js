import express from "express";

export const sumas = express.Router();

const listaSumas = []
let sumasId = 0

//Listar todas las sumas
sumas.get("/listaSumas", (req, res) => {
    res.send(listaSumas)
})

//Añadir una suma a listaSumas

//AGREGAR VERIFICACIONES
sumas.post("/listaSumas", (req, res) => {
    const {sumando1, sumando2} = req.body
    const suma = {
        idSuma: sumasId++,
        sumando1: sumando1,
        sumando2: sumando2,
        resultado: (sumando1 + sumando2)
    }
    listaSumas.push(suma)

    res.status(201).send({data: suma})
})