import express from "express";

export const sumasRoute = express.Router();

let sumas = [
  { id: 1, a: 8, b: 2, resultado: 4 },
  { id: 2, a: 18, b: 3, resultado: 6 },
  { id: 3, a: 880, b: 8, resultado: 110 },
];
let sumasMaxid = 0;

// obtener todas las sumas
sumasRoute.get("/", (req, res) => {
  return res.json({ data: sumas });
});

// obtener una division por id
sumasRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const sumaEncontrada = sumas.find((div) => div.id === parseInt(id));

  if (!sumaEncontrada) {
    return res.status(404).send({ mensaje: "División no encontrada" });
  }

  return res.json({ data: sumaEncontrada });
});

// agregar una nueva suma
sumasRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevaSuma = { id: ++sumasMaxid, a, b, resultado: a / b };

  sumas.push(nuevaSuma);
  return res.status(201).json({ data: nuevaSuma });
});

//  eliminar una suma por ID
sumasRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  sumas = sumas.filter((sum) => sum.id !== parseInt(id));

  return res.status(202).send({ id });
});

// actualizar una suma existente
sumasRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const sumaActualizada = {
    id: id,
    a,
    b,
    resultado: a / b,
    fecha: new Date(),
  };

  sumas = sumas.map((sum) =>
    sum.id === sumaActualizada.id ? sumaActualizada : sum
  );

  return res.status(200).json({ data: sumaActualizada });
});
