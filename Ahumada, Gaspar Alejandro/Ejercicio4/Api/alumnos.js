import express from "express";

export const alumnosRouter = express.Router();

let alumnos = [
   { id: 1, alumno: "Gaspar", notas: { nota1: 10, nota2: 10, nota3: 1 } }
];
let alumnosMaxId = alumnos.length;

// GET /alumnos
alumnosRouter.get("/", (req, res) => {
  res.send({ data: alumnos });
});

// POST /alumnos
alumnosRouter.post("/", (req, res) => {
  const { alumno, notas  } = req.body;

  // Verifico si ya existe un alumno con el mismo nombre
  const alumnoRepetido = alumnos.some((a) => a.alumno === alumno);

  if (alumnoRepetido) {
    return res.status(400).send({ error : "Alumno repetido" });
  }

  // Verifico si alguna nota es negativa
  const notasNegativas = notas.nota1 < 0 || notas.nota2 < 0 || notas.nota3 < 0;

  if (notasNegativas) {
    return res.status(400).send({ error: "Las notas no pueden ser negativas" });
  }

  // Crear nuevo alumno
  const nuevoAlumno = {
    id: ++alumnosMaxId,
    alumno,
    notas,
    fecha: new Date(),
  };

  alumnos.push(nuevoAlumno);
  res.status(201).send({ data: nuevoAlumno });
});

// PUT /alumnos/:id
alumnosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { alumno, notas } = req.body;

  // Verifico si ya existe un alumno con el mismo nombre y diferente id
  const nombreRepetido = alumnos.some((a) => a.alumno === alumno && a.id !== id);

  if (nombreRepetido) {
    return res.status(400).send({ error : "Alumno repetido" });
  }

  // Verifico si alguna nota es negativa
  const notasNegativas = notas.nota1 < 0 || notas.nota2 < 0 || notas.nota3 < 0;

  if (notasNegativas) {
    return res.status(400).send({ error: "Las notas no pueden ser negativas" });
  }

  // Modificar el alumno
  const alumnoModificado = { id, alumno, notas, fecha: new Date() };
  alumnos = alumnos.map((a) => (a.id === id ? alumnoModificado : a));

  res.status(200).send({ data: alumnoModificado });
});

// DELETE /alumnos/:id
alumnosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alumno) => alumno.id !== id);

  res.status(200).send({ data: `Alumno con id ${id} eliminado` });
});
