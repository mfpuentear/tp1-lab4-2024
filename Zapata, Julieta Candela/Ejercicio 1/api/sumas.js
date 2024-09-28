import express from "express";

export const sumasRouter = express.Router();

let sumas = [];
let sumasMaxId = 0;

// GET /sumas
sumasRouter.get("/", (req, res) => {
  res.send({ sumas });
});

// GET /sumas/:id
sumasRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const suma = sumas.find((suma) => suma.id == id);
  res.send({ suma });
});

// POST /sumas
sumasRouter.post("/", (req, res) => {
  const a = req.body.a;
  if (a == null) {
    res.status(404).send({ mensaje: "Completar el campo a" });
  }
  const b = req.body.b;
  if (b == null) {
    res.status(404).send({ mensaje: "Completar el campo b" });
  }
  const suma = { id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ suma });
});

// PUT /sumas/:id
sumasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const sumaModificada = { id, a, b, resultado: a + b, fecha: new Date() };
  sumas.forEach((suma, index) => {
    if (suma.id === id) {
      sumas[index] = sumaModificada;
    }
  });
  res.status(200).send({ suma: sumaModificada });
});

// DELETE /sumas/:id
sumasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});

