import express from "express";

export const multiplicacionesRoute = express.Router();

let multiplicaciones = [];

multiplicacionesRoute.get("/", (req, res) => {
  return res.json({ data: multiplicaciones });
});

multiplicacionesRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const multiplicacionEncontrada = multiplicaciones.find(
    (mult) => mult.id === parseInt(id)
  );

  if (!multiplicacionEncontrada) {
    return res.status(404).send({ mensaje: "multiplicacion no encontrada" });
  }

  return res.json({ data: multiplicacionEncontrada });
});

multiplicacionesRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevoId =
    multiplicaciones.length > 0
      ? multiplicaciones[multiplicaciones.length - 1].id + 1
      : 1;
  const nuevamultiplicacion = {
    id: nuevoId,
    a,
    b,
    resultado: a * b,
  };

  multiplicaciones.push(nuevamultiplicacion);
  return res.status(201).json({ data: nuevamultiplicacion });
});

multiplicacionesRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  multiplicaciones = multiplicaciones.filter(
    (mult) => mult.id !== parseInt(id)
  );

  return res.status(202).send({ id });
});

multiplicacionesRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const multiplicacionActualizada = {
    id: parseInt(id),
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };

  multiplicaciones = multiplicaciones.map((mult) =>
    mult.id === multiplicacionActualizada.id ? multiplicacionActualizada : mult
  );

  return res.status(200).json({ data: multiplicacionActualizada });
});
