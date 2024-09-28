import express from "express";

export const alumnosRouter = express.Router();

let alumnos = [
  {
    id: 1,
    nombre: "ben",
    nota1: 1,
    nota2: 2,
    nota3: 3,
  },
];
let alumnosMaxId = 0;

alumnosRouter.get("/", (req, res) => {
  res.send({ alumnos });
});

alumnosRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const alumno = alumnos.find((alumno) => alumno.id == id);
  if (!alumno) {
    res.status(404).send({ mensaje: "no existe el alumno" });
  }
  res.send({ alumno });
});

alumnosRouter.post("/", (req, res) => {
  const { id } = parseInt(req.params);
  const { nombre, nota1, nota2, nota3 } = req.body;
  const repetido = alumnos.find((alum) => alum.nombre === nombre);

  if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || repetido) {
    return res.status(400).send({
      mensaje: "la nota debe ser mayor a 0 o el alumno ya existe",
    });
  }

  const alumnoNuevo = {
    id: ++alumnosMaxId,
    nombre: nombre,
    nota1: nota1,
    nota2: nota2,
    nota3: nota3,
  };
  alumnos.push(alumnoNuevo);
  res.status(201).json({ alumnoNuevo });
});

alumnosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, nota1, nota2, nota3 } = req.body;
  const repetido = alumnos.find((alum) => alum.nombre === nombre);
  if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || repetido) {
    return res.status(400).send({
      mensaje: "la nota debe ser mayor a 0 o el alumno ya existe",
    });
  }

  const alumnoModificado = {
    id: id,
    nombre: nombre,
    nota1: nota1,
    nota2: nota2,
    nota3: nota3,
  };

  alumnos = alumnos.map((alum) =>
    alum.id === alumnoModificado.id ? alumnoModificado : alum
  );
  res.status(200).json({ alumno: alumnoModificado });
});

alumnosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alumno) => alumno.id !== id);
  res.status(200).send({ id });
});
