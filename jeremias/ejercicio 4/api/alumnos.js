import express from "express";

export const alumnosRoute = express.Router();

let alumnos = [];

alumnosRoute.get("/", (req, res) => {
  return res.json({ data: alumnos });
});

alumnosRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const alumnoEncontrado = alumnos.find((alu) => alu.id === parseInt(id));

  if (!alumnoEncontrado) {
    return res.status(404).send({ mensaje: "alumno no encontrado" });
  }

  return res.json({ data: alumnoEncontrado });
});

alumnosRoute.post("/", (req, res) => {
  const { nombre, nota1, nota2, nota3 } = req.body;
  const comparacion = alumnos.find((alu) => alu.nombre === nombre);

  if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || comparacion) {
    return res.status(400).send({
      mensaje:
        nota1 <= 0 || nota2 <= 0 || nota3 <= 0
          ? "la nota debe ser mayor a 0"
          : "el nombre ya existe",
    });
  }
  const nuevoId = alumnos.length > 0 ? alumnos[alumnos.length - 1].id + 1 : 1;
  const nuevoalumno = { id: nuevoId, nombre, nota1, nota2, nota3 };

  alumnos.push(nuevoalumno);
  return res.status(201).json({ data: nuevoalumno });
});

alumnosRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  alumnos = alumnos.filter((alu) => alu.id !== parseInt(id));

  return res.status(202).send({ id });
});

alumnosRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, nota1, nota2, nota3 } = req.body;
  const alumnoEx = alumnos.find((alu) => alu.id === parseInt(id));

  if (!alumnoEx) {
    return res.status(404).send({ mensaje: "alumno no encontrado" });
  }

  const comparacion = alumnos.find(
    (alu) => alu.nombre === nombre && alu.id !== parseInt(id)
  );
  if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || comparacion) {
    return res.status(400).send({
      mensaje:
        nota1 <= 0 || nota2 <= 0 || nota3 <= 0
          ? "la nota debe ser mayor a 0"
          : "el nombre ya existe",
    });
  }

  const alumnoActualizado = {
    id: parseInt(id),
    nombre,
    nota1,
    nota2,
    nota3,
    fecha: new Date(),
  };

  alumnos = alumnos.map((alu) =>
    alu.id === parseInt(id).id ? alumnoActualizado : alu
  );

  return res.status(200).json({ data: alumnoActualizado });
});