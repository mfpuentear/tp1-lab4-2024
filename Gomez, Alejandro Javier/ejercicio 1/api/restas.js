import express from "express";

export const restas = express.Router();

let listaRestas = [];
let restasId = 0;

restas.get("/listaRestas", (req, res) => {
  res.send(listaRestas);
});

restas.post("/listaRestas", (req, res) => {
  const { a, b } = req.body;

  if (typeof a != "number" || typeof b != "number" || isNaN(a) || isNaN(b)) {
    res.status(400).send("Verifique los datos enviados");

  } else {
    const resta = {
      idResta: restasId++,
      a: a,
      b: b,
      resultado: a - b,
    };
    
    listaRestas.push(resta);

    res.status(201).send({ resta });
  }
});

restas.delete("/listaRestas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaRestas = listaRestas.filter((resta) => resta.idResta !== id);
  res.status(200).send({ id });
});