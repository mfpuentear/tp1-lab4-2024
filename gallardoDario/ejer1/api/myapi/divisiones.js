import express from "express";

export const divisionesRouter = express.Router();

let divisiones = [];
let divisionesMaxId = 0;

divisionesRouter.get("/", (req, res) => {
  res.send({ data: divisiones });
});

divisionesRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const division = divisiones.find((division) => division.id == id);

  res.send({ data: division });
});

divisionesRouter.post("/", (req, res) => {
  const { a, b } = req.body;

  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
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

divisionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() };

  divisiones = divisiones.map((division) =>
    division.id === id ? divisionModificada : division
  );
  res.status(200).send({ division: divisionModificada });
});

divisionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});
