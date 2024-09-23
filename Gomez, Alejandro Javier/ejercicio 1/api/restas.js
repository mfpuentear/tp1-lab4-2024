import express from "express";

export const restas = express.Router();

const listaRestas = []
let restasId = 0

//Listar todas las restas
restas.get("/listaRestas", (req, res) => {
    res.send(listaRestas)
})

//Añadir una resta a listaRestas
restas.post("/listaRestas", (req, res) => {
    const {minuendo, sustraendo} = req.body
    const resta = {
        idResta: restasId++,
        minuendo: minuendo,
        sustraendo: sustraendo,
        resultado: (minuendo - sustraendo)
    }
    listaRestas.push(resta)

    res.status(201).send({data: resta})
})