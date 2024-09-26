import express from "express";

export const multiplicacionesRouter = express.Router();

let multiplicaciones = [];
let multiplicacionesMaxId = 0;

// POST /multiplicaciones
multiplicacionesRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  const multiplicacion = {
    id: ++multiplicacionesMaxId,
    a,
    b,
    resultado: a * b,
    operacion: "*",  // Indicar el tipo de operación
    fecha: new Date(),
  };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ data: multiplicacion });
});

// GET /multiplicaciones
multiplicacionesRouter.get("/", (req, res) => {
  res.send({ multiplicaciones });
});

multiplicacionesRouter.getOperaciones = () => multiplicaciones;
