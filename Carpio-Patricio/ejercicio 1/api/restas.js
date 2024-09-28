import express from "express";

export const restasRoute = express.Router();

let restas = [];

// obtener todas las restas
restasRoute.get("/", (req, res) => {
  return res.json({ data: restas });
});

// obtener una resta por id
restasRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const restaEncontrada = restas.find((rest) => rest.id === parseInt(id));

  if (!restaEncontrada) {
    return res.status(404).send({ mensaje: "resta no encontrada" });
  }

  return res.json({ data: restaEncontrada });
});

// agregar una nueva resta
restasRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevoId = restas.length > 0 ? restas[restas.length - 1].id + 1 : 1;
  const nuevaResta = { nuevoId, a, b, resultado: a - b };

  restas.push(nuevaResta);
  return res.status(201).json({ data: nuevaResta });
});

//  eliminar una resta por ID
restasRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  restas = restas.filter((rest) => rest.id !== parseInt(id));

  return res.status(202).send({ id });
});

// actualizar una resta existente
restasRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const restaActualizada = {
    id: parseInt(id),
    a,
    b,
    resultado: a - b,
    fecha: new Date(),
  };

  restas = restas.map((rest) =>
    rest.id === restaActualizada.id ? restaActualizada : rest
  );

  return res.status(200).json({ data: restaActualizada });
});
