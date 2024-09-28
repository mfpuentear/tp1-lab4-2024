import express from "express";

export const sumasRouter = express.Router();

let sumas = [{ id: 5, a: 12, b: 55, resultado: 87 }];
let sumasMaxId = 0;

sumasRouter.get("/", (req, res) => {
  res.send({ sumas });
});

sumasRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const suma = sumas.find((suma) => suma.id == id);

  res.send({ suma });
});

sumasRouter.post("/", (req, res) => {
  const { a, b } = req.body;
  const suma = { id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ suma });
});

// PUT /sumas/:id
sumasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const sumaModificada = { id, a, b, resultado: a + b, fecha: new Date() };
  sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
  res.status(200).send({ suma: sumaModificada });
});
// DELETE /sumas/:id
sumasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});
