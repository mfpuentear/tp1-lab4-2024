import express from "express";

export const divisionesRouter = express.Router();

const divisiones = [];
let divisionesMaxId = 0;

// GET /divisiones
divisionesRouter.get("/", (req, res) => {
  res.send({ divisiones });
});

// GET /divisiones/:id
divisionesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const division = divisiones.find((division) => division.id == id);
  res.send({ division });
});

// POST/divisiones
divisionesRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  // verifico que b sea distinto de 0
  if (b === 0) {
    res.status(404).send({ mensaje: "division por 0" });
    return;
  }
  const division = { id: ++divisionesMaxId, a, b, resultado: a / b };
  divisiones.push(division);
  res.status(201).send({ division });
});

// DELETE /divisiones/:id
divisionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});

