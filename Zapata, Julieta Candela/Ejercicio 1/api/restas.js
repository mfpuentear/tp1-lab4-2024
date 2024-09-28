import express from "express";

export const restasRouter = express.Router();

let restas = [];
let restasMaxId = 0;

// GET /restas
restasRouter.get("/", (req, res) => {
  res.send({ restas });
});

// GET /restas/:id
restasRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const resta = restas.find((resta) => resta.id == id);
  res.send({ resta });
});

// POST/restas
restasRouter.post("/", (req, res) => {
  const a = req.body.a;
  if (a == null) {
    res.status(404).send({ mensaje: "Completar el campo a" });
  }
  const b = req.body.b;
  if (b == null) {
    res.status(404).send({ mensaje: "Completar el campo b" });
  }
  const resta = {
    id: ++restasMaxId,
    a,
    b,
    resultado: a - b,
    fecha: new Date(),
  };
  restas.push(resta);
  res.status(201).send({ resta });
});

//PUT /restas/:id
restasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  restas.forEach((resta, index) => {
    if (resta.id === id) {
      restas[index] = restaModificada;
    }
  });
  res.status(200).send({ resta: restaModificada });
});

//DELETE/restas/:id
restasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

