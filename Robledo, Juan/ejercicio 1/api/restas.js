import express from "express";

const restasRouter = express.Router();

let restas = [];
let restasMaxId = 0;

// GET /restas
restasRouter.get("/", (req, res) => {
  res.send({ data: restas });
});

// GET /restas/:id
restasRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const resta = restas.find((resta) => resta.id == id);
  res.send({ data: resta });
});

// POST /restas
restasRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  const resta = {
    id: ++restasMaxId,
    a,
    b,
    resultado: a - b,
    fecha: new Date(),
  };
  restas.push(resta);
  res.status(201).send({ data: resta });
});

// PUT /restas/:id
restasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };

  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send({ data: restaModificada });
});

// DELETE /restas/:id
restasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

export default restasRouter;
