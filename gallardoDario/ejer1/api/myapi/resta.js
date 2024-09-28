import express from "express";

export const restaRouter = express.Router();

let restas = [{ id: 5, a: 12, b: 55, resultado: 87 }];
let restasMaxId = 0;

restaRouter.get("/", (req, res) => {
  res.send({ restas });
});

restaRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const resta = restas.find((resta) => resta.id == id);

  res.send({ resta });
});

restaRouter.post("/", (req, res) => {
  const { a, b } = req.body;
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

// PUT /restas/:id
restaRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send({ resta: restaModificada });
});
// DELETE /restas/:id
restaRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});
