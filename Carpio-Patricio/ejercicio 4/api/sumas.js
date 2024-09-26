import express from "express";

export const alumnosRoute = express.Router();

let alumnos = [
  { id: 1, a: 8, b: 2, resultado: 10 },
  { id: 2, a: 18, b: 3, resultado: 21 },
  { id: 3, a: 880, b: 8, resultado: 888 },
];
let alumnosMaxid = 0;

// obtener todas las alumnos
alumnosRoute.get("/", (req, res) => {
  return res.json({ data: alumnos });
});

// obtener una suma por id
alumnosRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const sumaEncontrada = alumnos.find((sum) => sum.id === parseInt(id));

  if (!sumaEncontrada) {
    return res.status(404).send({ mensaje: "suma no encontrada" });
  }

  return res.json({ data: sumaEncontrada });
});

// agregar una nueva suma
alumnosRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevaSuma = { id: ++alumnosMaxid, a, b, resultado: a + b };

  alumnos.push(nuevaSuma);
  return res.status(201).json({ data: nuevaSuma });
});

//  eliminar una suma por ID
alumnosRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  alumnos = alumnos.filter((sum) => sum.id !== parseInt(id));

  return res.status(202).send({ id });
});

// actualizar una suma existente
alumnosRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const sumaActualizada = {
    id: id,
    a,
    b,
    resultado: a + b,
    fecha: new Date(),
  };

  alumnos = alumnos.map((sum) =>
    sum.id === sumaActualizada.id ? sumaActualizada : sum
  );

  return res.status(200).json({ data: sumaActualizada });
});
