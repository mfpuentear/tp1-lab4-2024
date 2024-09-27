import express from "express";

const router = express.Router();

let alumnos = [
  { id: 1, nombre: "Juan", notas: [10, 9, 10], fecha: new Date() },
  { id: 2, nombre: "Pedro", notas: [7, 9, 6], fecha: new Date() },
  { id: 3, nombre: "Maria", notas: [4, 7, 7], fecha: new Date() },
];
let alumnoIdMax = 4;

// GET /alumnos
router.get("/", (req, res) => {
  res.send({ data: alumnos });
});

// POST /alumnos
router.post("/", (req, res) => {
  const { nombre, notas } = req.body;

  if (nombre == null) {
    return res.status(400).send({ error: "Debe ingresar un nombre" });
  }
  notas.forEach((nota) => {
    if (isNaN(parseFloat(nota))) {
      return res
        .status(400)
        .send({ error: "Las notas deben ser valores numéricos" });
    }
    if (parseFloat(nota) < 0 || parseFloat(nota) > 10) {
      return res
        .status(400)
        .send({ error: "Las notas deben estar entre 0 y 10" });
    }
  });
  if (notas.length !== 3) {
    return res.status(400).send({ error: "Debe ingresar 3 notas" });
  }

  if (
    alumnos.some(
      (alumno) =>
        alumno.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    )
  ) {
    return res
      .status(400)
      .send({ error: "Este nombre ya está utilizado por otro alumno" });
  }

  const nuevoAlumno = {
    id: ++alumnoIdMax,
    nombre,
    notas,
    fecha: new Date(),
  };
  alumnos.push(nuevoAlumno);
  res.status(201).send({ data: nuevoAlumno });
});

// PUT /alumnos/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, notas } = req.body;

  if (nombre == null) {
    return res.status(400).send({ error: "Debe ingresar un nombre" });
  }
  notas.forEach((nota) => {
    if (isNaN(parseFloat(nota))) {
      return res
        .status(400)
        .send({ error: "Las notas deben ser valores numéricos" });
    }
    if (parseFloat(nota) < 0 || parseFloat(nota) > 10) {
      return res
        .status(400)
        .send({ error: "Las notas deben estar entre 0 y 10" });
    }
  });
  if (notas.length !== 3) {
    return res.status(400).send({ error: "Debe ingresar 3 notas" });
  }
  if (
    alumnos.some(
      (alumno) =>
        alumno.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
        alumno.id !== id
    )
  ) {
    return res
      .status(400)
      .send({ error: "Este nombre ya está utilizado por otro alumno" });
  }

  const alumnoModificado = {
    id,
    nombre,
    notas,
    fecha: new Date(),
  };

  alumnos = alumnos.map((alumno) =>
    alumno.id === id ? alumnoModificado : alumno
  );

  res.status(200).send({ data: alumnoModificado });
});

// DELETE /alumnos/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alumno) => alumno.id !== id);
  res.status(200).send({ id });
});

export default router;
