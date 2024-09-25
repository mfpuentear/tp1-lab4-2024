import express from "express";

export const restas = express.Router();

let listaRestas = [];
let id = 0;

restas.get("/listaRestas", (req, res) => {
  res.send(listaRestas);
});

restas.post("/listaRestas", (req, res) => {
  const { a, b } = req.body;

  if (typeof a != "number" || typeof b != "number" || isNaN(a) || isNaN(b)) {
    res.status(400).send("Verifique los datos enviados");

  } else {
    const resta = {
      id: id++,
      a: a,
      b: b,
      resultado: (a - b),
    };
    
    listaRestas.push(resta);

    res.status(201).send({ resta });
  }
});

restas.delete("/listaRestas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaRestas = listaRestas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

restas.put("/listaRestas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const resta = listaRestas.find((resta) => resta.id === id);

  if (resta && typeof a === "number" && typeof b === "number") {
    resta.a = a;
    resta.b = b;
    resta.resultado = a - b;
    res.status(200).send({ resta });
  } else {
    res.status(400).send("Datos incorrectos o resta no encontrada");
  }
});
