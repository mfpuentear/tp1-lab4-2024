import express from "express";

export const sumasRoute = express.Router();

let sumas = [
  { id: 1, a: 8, b: 2, resultado: 10 },
  { id: 2, a: 18, b: 3, resultado: 21 },
  { id: 3, a: 880, b: 8, resultado: 888 },
];
let sumasMaxid = 0;

sumasRoute.get("/", (req, res) => {
  return res.json({ data: sumas });
});

sumasRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const sumaEncontrada = sumas.find((sum) => sum.id === parseInt(id));

  if (!sumaEncontrada) {
    return res.status(404).send({ mensaje: "suma no encontrada" });
  }

  return res.json({ data: sumaEncontrada });
});

sumasRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevaSuma = { id: ++sumasMaxid, a, b, resultado: a + b };

  sumas.push(nuevaSuma);
  return res.status(201).json({ data: nuevaSuma });
});

sumasRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  sumas = sumas.filter((sum) => sum.id !== parseInt(id));

  return res.status(202).send({ id });
});

sumasRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const sumaActualizada = {
    id: id,
    a,
    b,
    resultado: a + b,
    fecha: new Date(),
  };

  sumas = sumas.map((sum) =>
    sum.id === sumaActualizada.id ? sumaActualizada : sum
  );

  return res.status(200).json({ data: sumaActualizada });
});