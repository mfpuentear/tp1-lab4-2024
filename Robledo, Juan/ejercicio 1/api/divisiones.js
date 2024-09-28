import express from "express";

export const divisionesRouter = express.Router();

let divisiones = [];
let divisionesMaxId = 0;

// GET /divisiones
divisionesRouter.get("/", (req, res) => {
  res.send({ data: divisiones });
});

// GET /divisiones/:id
divisionesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const division = divisiones.find((division) => division.id == id);
  res.send({ data: division });
});

// POST /divisiones
divisionesRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).send({ error: "División por cero" });
  }

  const division = {
    id: ++divisionesMaxId,
    a,
    b,
    resultado: a / b,
    fecha: new Date(),
  };
  divisiones.push(division);
  res.status(201).send({ data: division });
});

// PUT /divisiones/:id
divisionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const divModificada = { id, a, b, resultado: a / b, fecha: new Date() };

  divisiones = divisiones.map((div) => (div.id === id ? divModificada : div));
  res.status(200).send({ data: divModificada });
});

// DELETE /divisiones/:id
divisionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((div) => div.id !== id);
  res.status(200).send({ id });
});
