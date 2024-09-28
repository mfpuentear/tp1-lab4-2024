import express from "express";

export const divisionesRoute = express.Router();

let divisiones = [
  { id: 1, a: 8, b: 2, resultado: 4 },
  { id: 2, a: 18, b: 3, resultado: 6 },
  { id: 3, a: 880, b: 8, resultado: 110 },
];
let divisionesMaxid = 0;

// obtener todas las divisiones
divisionesRoute.get("/", (req, res) => {
  return res.json({ data: divisiones });
});

// obtener una division por id
divisionesRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const divisionEncontrada = divisiones.find((div) => div.id === parseInt(id));

  if (!divisionEncontrada) {
    return res.status(404).send({ mensaje: "División no encontrada" });
  }

  return res.json({ data: divisionEncontrada });
});

// agregar una nueva división
divisionesRoute.post("/", (req, res) => {
  const { a, b } = req.body;

  if (b === 0) {
    return res.status(400).send({ mensaje: "No se puede dividir por cero" });
  }

  const nuevaDivision = { id: ++divisionesMaxid, a, b, resultado: a / b };

  divisiones.push(nuevaDivision);
  return res.status(201).json({ data: nuevaDivision });
});

//  eliminar una división por ID
divisionesRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  divisiones = divisiones.filter((div) => div.id !== parseInt(id));

  return res.status(202).send({ id });
});

// actualizar una division existente
divisionesRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  if (b === 0) {
    return res.status(400).send({ mensaje: "No se puede dividir por cero" });
  }

  const divisionActualizada = {
    id: id,
    a,
    b,
    resultado: a / b,
    fecha: new Date(),
  };

  divisiones = divisiones.map((div) =>
    div.id === divisionActualizada.id ? divisionActualizada : div
  );

  return res.status(200).json({ data: divisionActualizada });
});