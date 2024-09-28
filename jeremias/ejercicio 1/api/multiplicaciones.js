import express from "express";

export const multiplicacionesRoute = express.Router();

let multiplicaciones = [
  { id: 1, a: 8, b: 2, resultado: 16 },
  { id: 2, a: 18, b: 3, resultado: 54 },
  { id: 3, a: 880, b: 8, resultado: 7040 },
];
let multiplicacionesMaxid = 0;

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
  const nuevamultiplicacion = {
    id: ++multiplicacionesMaxid,
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
    id: id,
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