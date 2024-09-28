import express from "express";

export const sumasRoute = express.Router();

let sumas = [];

// obtener todas las sumas
sumasRoute.get("/", (req, res) => {
  return res.json({ data: sumas });
});

// obtener una suma por id
sumasRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const sumaEncontrada = sumas.find((sum) => sum.id === parseInt(id));

  if (!sumaEncontrada) {
    return res.status(404).send({ mensaje: "suma no encontrada" });
  }

  return res.json({ data: sumaEncontrada });
});

// agregar una nueva suma
sumasRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevoId = sumas.length > 0 ? sumas[sumas.length - 1].id + 1 : 1;
  const nuevaSuma = { id: nuevoId, a, b, resultado: a + b };

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
    id: parseInt(id),
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
