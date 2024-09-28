import express from "express";

export const alumnosRouter = express.Router();

let alumnos = [
  {
    id: 6,
    nombre: "Dario",
    nota1: 10,
    nota2: 3,
    nota3: 6,
    promedio: 6.3,
    estado: "aprobado",
  },
];
let alumnosMaxId = 0;

alumnosRouter.get("/", (req, res) => {
  res.send({ alumnos });
});

alumnosRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const alumno = alumnos.find((alumno) => alumno.id == id);

  res.send({ alumno });
});

alumnosRouter.post("/", (req, res) => {
  const { nombre, nota1, nota2, nota3 } = req.body;

  if (alumnos.some((alumno) => alumno.nombre === nombre)) {
    res.status(400).send({ mensaje: "El alumno ya existe." });
  }

  if (nota1 < 0 || nota2 < 0 || nota3 < 0) {
    res.status(400).send({ mensaje: "notas bajas" });
  }

  const promedio = (nota1 + nota2 + nota3) / 3;
  const estado = promedio >= 6 ? "aprobado" : "reprobado";
  const alumno = {
    id: ++alumnosMaxId,
    nombre,
    nota1,
    nota2,
    nota3,
    promedio,
    estado,
    fecha: new Date(),
  };
  alumnos.push(alumno);
  res.status(201).send({ alumno });
});

// PUT /alumnos/:id
alumnosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, nota1, nota2, nota3 } = req.body;
  if (alumnos.some((alumno) => alumno.nombre === nombre)) {
    res.status(400).send({ mensaje: "El alumno ya existe." });
    return;
  }
  if (nota1 < 0 || nota2 < 0 || nota3 < 0) {
    res.status(400).send({ mensaje: "notas bajas" });
    return;
  }
  const promedio = (nota1 + nota2 + nota3) / 3;
  const estado = promedio >= 6 ? "aprobado" : "reprobado";

  const alumnoModificado = {
    id,
    nombre,
    nota1,
    nota2,
    nota3,
    promedio,
    estado,
    fecha: new Date(),
  };
  alumnos = alumnos.map((alumno) =>
    alumno.id === id ? alumnoModificado : alumno
  );
  res.status(200).send({ alumno: alumnoModificado });
});
// DELETE /alumnos/:id
alumnosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alumno) => alumno.id !== id);
  res.status(200).send({ id });
});
