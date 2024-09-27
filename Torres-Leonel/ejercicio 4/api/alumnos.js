import express from "express"

const router = express.Router();

let alumnos = [
  { id: 1, nombre: "Maria", nota1: 5, nota2: 6, nota3:8 },
  { id: 2, nombre: "Pedro", nota1: 10, nota2: 8, nota3:8},
  { id: 3, nombre: "Pepe", nota1: 8, nota2:8, nota3:8},
];
let alumnosMaxId = alumnos.length;

router.get("/", (req, res) => {
  res.send({ alumnos });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const alumno = alumnos.find((alumno) => alumno.id == id);

  res.send({ alumno });
});

router.post("/", (req, res) => {
  const nombre = req.body.nombre;
  const nota1 = parseInt(req.body.nota1);
  const nota2 = parseInt(req.body.nota2);
  const nota3 = parseInt(req.body.nota3);


  const existeAlumno = alumnos.some((alumno)=>alumno.nombre == nombre)
  if (existeAlumno) {
    res.status(400).send({mensaje:"El alumno ya existe"})
    return
  }
  if (nota1 <=0 || nota2 <= 0 || nota3 <= 0) {
    res.status(400).send({mensaje:"Las notas deben ser mayor a 0"})
    return
  }
  const alumno = { id: ++alumnosMaxId, nombre, nota1, nota2, nota3, fecha: new Date() };
  alumnos.push(alumno);
  res.status(201).send({ alumno });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, nota1, nota2, nota3 } = req.body;
  
  const existeAlumno = alumnos.some((alumno)=>alumno.nombre == nombre)
  if (existeAlumno) {
    res.status(400).send({mensaje:"El nombre ya existe"})
    return
  }
  if (nota1 <=0 || nota2 <= 0 || nota3 <= 0) {
    res.status(400).send({mensaje:"Las alumnos deben ser mayor a 0"})
    return
  }
  
  const alumnoModificado = { id, nombre, nota1, nota2, nota3, fecha: new Date()};
  
  alumnos = alumnos.map((alumno) => (alumno.id === id ? alumnoModificado : alumno));
  res.status(200).send({ nombre: alumnoModificado });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alumno) => alumno.id !== id);
  res.status(200).send({ id });
});

export default router;