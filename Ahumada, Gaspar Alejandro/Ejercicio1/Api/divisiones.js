import express from "express";

export const divisionesRouter = express.Router();

let divisiones = [];
let divisionesMaxId = 0;

// GET /divisiones
divisionesRouter.get("/", (req, res) => {
  res.send({ data: divisiones });
});

// POST /divisiones
divisionesRouter.post("/", (req, res) => {
  // Obtengo a y b
  const { a, b } = req.body;

  // Verifico que b sea distinto de 0
  if (b === 0) {
    res.status(400).send({ error : "Division por cero" });
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
  res.status(201).send({ data : division });
}); 
// PUT /sumas/:id
divisionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  if (b === 0) {
    res.status(400).send({ error : "Division por cero" });
  }
  const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() };
  divisiones = divisiones.map((division) => (division.id === id ? divisionModificada : data));
  res.status(200).send({ data : divisionModificada });
});

// DELETE /sumas/:id
divisionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});
