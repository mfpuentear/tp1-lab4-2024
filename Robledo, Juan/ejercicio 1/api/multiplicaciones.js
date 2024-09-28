import express from "express";

export const multiplicacionesRouter = express.Router();

let multiplicaciones = [];
let multiplicacionesMaxId = 0;

// GET /multiplicaciones
multiplicacionesRouter.get("/", (req, res) => {
  res.send({ data: multiplicaciones });
});

// GET /multiplicaciones/:id
multiplicacionesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const multiplicacion = multiplicaciones.find((m) => m.id == id);
  res.send({ data: multiplicacion });
});

// POST /multiplicaciones
multiplicacionesRouter.post("/", (req, res) => {
  const { a, b } = req.body;

  const multiplicacion = {
    id: ++multiplicacionesMaxId,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ data: multiplicacion });
});

// PUT /multiplicaciones/:id
multiplicacionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const multModificada = { id, a, b, resultado: a * b, fecha: new Date() };

  multiplicaciones = multiplicaciones.map((mult) =>
    mult.id === id ? multModificada : mult
  );
  res.status(200).send({ data: multModificada });
});

// DELETE /multiplicaciones/:id
multiplicacionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicaciones = multiplicaciones.filter((mult) => mult.id !== id);
  res.status(200).send({ id });
});
