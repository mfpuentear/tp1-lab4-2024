import express from "express";

export const divisionesRouter = express.Router();

const divisiones = [];
let divisionesMaxId = 0;

// GET /recurso
divisionesRouter.get("/", (req, res) => {
  res.send({ divisiones });
});

divisionesRouter.get("/:id", (req, res) => {
  //obtengo id de la ruta
  const id = req.params.id;
  // busco la division con id
  const division = divisiones.find((division) => division.id == id);
  // devuelvo la division encontrada
  res.send({ division });
});

// POST
divisionesRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  // verifico que b sea distinto de 0
  if (b === 0) {
    res.status(404).send({ mensaje: "division por 0" });
    return;
  }
  //creo objeto division y lo agrego al arreglo y al cliente

  const division = { id: ++divisionesMaxId, a, b, resultado: a / b };
  divisiones.push(division);
  res.status(201).send({ division });
});

divisionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});
