import express from "express";

export const alumnos = express.Router();

let listaAlumnos = [];
let id = 0;

alumnos.get("/listaAlumnos", (req, res) => {
  res.send(listaAlumnos);
});

alumnos.post("/listaAlumnos", (req, res) => {
  const { nombre, apellido, nota1, nota2, nota3 } = req.body;

  if (
    nombre.trim().length === 0 ||
    apellido.trim().length === 0 ||
    typeof nombre != "string" ||
    typeof apellido != "string" ||
    typeof nota1 != "number" ||
    typeof nota2 != "number" ||
    typeof nota3 != "number" ||
    isNaN(nota1) ||
    isNaN(nota2) ||
    isNaN(nota3) ||
    nota1 <= 0 ||
    nota2 <= 0 ||
    nota3 <= 0 ||
    nota1 > 10 ||
    nota2 > 10 ||
    nota3 > 10
  ) {
    res.status(400).send("Verifique los datos enviados");
  } else {
    const nombreRepetido = listaAlumnos.find(
      (alumno) => alumno.nombre.toLowerCase() === nombre.toLowerCase()
    );
    const apellidoRepetido = listaAlumnos.find(
      (alumno) => alumno.apellido.toLowerCase() === apellido.toLowerCase()
    );

    if (nombreRepetido && apellidoRepetido) {
      res.status(400).send(`El alumno que intenta agregar ya está en la lista`);
    } else {
      let promedio = (nota1 + nota2 + nota3) / 3;
      if (promedio >= 8) {
        promedio = "Promocionado";
      } else if (promedio >= 6) {
        promedio = "Aprobado";
      } else {
        promedio = "Reprobado";
      }

      const alumno = {
        id: id++,
        nombre: nombre,
        apellido: apellido,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        condicion: promedio,
      };

      listaAlumnos.push(alumno);

      res.status(201).send({ alumno });
    }
  }
});

alumnos.delete("/listaAlumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaAlumnos = listaAlumnos.filter((alumno) => alumno.id !== id);
  res.status(200).send({ id });
});

alumnos.put("/listaAlumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, apellido, nota1, nota2, nota3 } = req.body;

  const alumno = listaAlumnos.find((alumno) => alumno.id === id);

  if (
    nombre.trim().length === 0 ||
    apellido.trim().length === 0 ||
    typeof nombre != "string" ||
    typeof apellido != "string" ||
    typeof nota1 != "number" ||
    typeof nota2 != "number" ||
    typeof nota3 != "number" ||
    isNaN(nota1) ||
    isNaN(nota2) ||
    isNaN(nota3) ||
    nota1 <= 0 ||
    nota2 <= 0 ||
    nota3 <= 0 ||
    nota1 > 10 ||
    nota2 > 10 ||
    nota3 > 10
  ) {
    res.status(400).send("Datos incorrectos o no encontrados");
  } else {
    let promedio = (nota1 + nota2 + nota3) / 3;
    if (promedio >= 8) {
      promedio = "Promocionado";
    } else if (promedio >= 6) {
      promedio = "Aprobado";
    } else {
      promedio = "Reprobado";
    }

    alumno.nombre = nombre;
    alumno.apellido = apellido;
    alumno.nota1 = nota1;
    alumno.nota2 = nota2;
    alumno.nota3 = nota3;
    alumno.condicion = promedio;
    res.status(200).send({ alumno });
  }
});
