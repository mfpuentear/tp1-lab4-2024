import express from "express";

const router = express.Router();

let alumnos = [
  { id: 0, nombre: "David Ramirez", nota1: 6, nota2: 8, nota3: 10 },
];

let alumnosMaxId = 0;

// GET listado de alumnos
router.get("/", (req, res) => {
  res.send({ alumnos });
});

// GET alumno por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const alum = alumnos.find((alum) => alum.id == id);
  res.send({ alum });
});

// POST nuevo alumno.
router.post("/", (req, res) => {
  const { nombre, nota1, nota2, nota3 } = req.body;

  const existe = alumnos.some((alum) => alum.nombre === nombre);
  if (existe) {
    return res.status(400).send({ mensaje: "No se puede agregar el mismo nombre" });
  }

  // Verifica que las notas sean entre 1 y 10
  if (
    nota1 <= 0 || nota1 > 10 ||
    nota2 <= 0 || nota2 > 10 ||
    nota3 <= 0 || nota3 > 10
  ) {
    return res.status(400).send({ mensaje: "Las notas deben estar entre 1 y 10" });
  }

  // Agrega el nuevo alumno al arreglo
  const alum = { id: ++alumnosMaxId, nombre, nota1, nota2, nota3, fecha: new Date() };
  alumnos.push(alum);
  res.status(201).send({ alum });
});

// PUT Modifica un alumno existente
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, nota1, nota2, nota3 } = req.body;

  // Verifica que las notas sean entre 1 y 10 
  if (
    nota1 <= 0 || nota1 > 10 ||
    nota2 <= 0 || nota2 > 10 ||
    nota3 <= 0 || nota3 > 10
  ) {
    return res.status(400).send({ mensaje: "Las notas deben estar entre 1 y 10" });
  }

  // Modifica el alumno
  const alumModificada = { id, nombre, nota1, nota2, nota3, fecha: new Date() };
  alumnos = alumnos.map((alum) => (alum.id === id ? alumModificada : alum));
  res.status(200).send({ alum: alumModificada });
});

// DELETE alumno por ID.
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alum) => alum.id !== id);
  res.status(200).send({ id });
});

export default router;
