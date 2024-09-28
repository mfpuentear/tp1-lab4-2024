import express from "express";

export const multiplicacionesRouter = express.Router();

let multiplicaciones = [];
let multiplicacionesMaxId = 0;

// GET /multiplicaciones
multiplicacionesRouter.get("/", (req, res) => {
  res.send({ multiplicaciones });
});

// GET /divisiones/:id
multiplicacionesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const multiplicacion = multiplicaciones.find(
    (multiplicacion) => multiplicacion.id == id
  );
  res.send({ multiplicacion });
});

// POST/multiplicaciones
multiplicacionesRouter.post("/", (req, res) => {
  const a = req.body.a;
  if (a == null) {
    res.status(404).send({ mensaje: "Completar el campo a" });
  }
  const b = req.body.b;
  if (b == null) {
    res.status(404).send({ mensaje: "Completar el campo b" });
  }
  const multiplicacion = {
    id: ++multiplicacionesMaxId,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ multiplicacion });
});

// PUT /multiplicaciones/:id
multiplicacionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const multiplicacionModificada = {
    id,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  multiplicaciones.forEach((multiplicacion, index) => {
    if (multiplicacion.id === id) {
      multiplicaciones[index] = multiplicacionModificada;
    }
  });
  res.status(200).send({ multiplicacion: multiplicacionModificada });
});

// DELETE /multiplicaciones/:id
multiplicacionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicaciones = multiplicaciones.filter(
    (multiplicacion) => multiplicacion.id !== id
  );
  res.status(200).send({ id });
});

