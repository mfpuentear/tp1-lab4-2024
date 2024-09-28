import express from "express";

export const multiplicacionRouter = express.Router();

let multiplicaciones = [];
let multiplicacionMaxId = 0;

// GET /multiplicacion
multiplicacionRouter.get("/", (req, res) => {
  res.send( multiplicaciones );
});

// GET /multiplicacion/:id
multiplicacionRouter.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la multiplicacion con id de la ruta
  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);

  // Devuelvo la multiplicacion encontrada
  res.send( multiplicacion );
});

// POST /multiplicacion
multiplicacionRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  const multiplicacion = { id: ++multiplicacionMaxId, a, b, resultado: a * b, fecha: new Date() };
  multiplicaciones.push(multiplicacion);
  res.status(201).send( multiplicacion );
});

// PUT /multiplicacion/:id
multiplicacionRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  // con map
  multiplicacion = multiplicacion.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion));
  res.status(200).send( multiplicacionModificada );
});

// DELETE /multiplicacion/:id
multiplicacionRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicacion = multiplicacion.filter((multiplicacion) => multiplicacion.id !== id);
  res.status(200).send({ id });
});

export default multiplicacionRouter