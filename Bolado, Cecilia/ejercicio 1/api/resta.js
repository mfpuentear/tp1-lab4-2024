import express from "express";

export const restasRouter = express.Router();

let restas = [];
let restasMaxId = 0;

// GET /restas
restasRouter.get("/", (req, res) => {
  res.send( restas );
});

// GET /restas/:id
restasRouter.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la resta con id de la ruta
  const resta = restas.find((resta) => resta.id == id);

  // Devuelvo la resta encontrada
  res.send( resta );
});

// POST /restas
restasRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  const resta = { id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date() };
  restas.push(resta);
  res.status(201).send( resta );
});

// PUT /restas/:id
restasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  // con map
  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send( restaModificada );
});

// DELETE /restas/:id
restasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

export default restasRouter