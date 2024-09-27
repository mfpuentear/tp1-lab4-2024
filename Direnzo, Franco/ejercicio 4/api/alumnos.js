import express from "express";

const router = express.Router();

let alumnos = [
];
let alumnosMaxId = 0;

// GET /areas
router.get("/", (req, res) => {
  res.send({ alumnos });
});

// GET /areas/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const alumno = alumnos.find((alumno) => alumno.id == id);
  res.send({ alumno });
});

// POST /areas
router.post("/", (req, res) => {
  const { a, b, c, d } = req.body;
  
  if(b<=0||c<=0||d<=0){
    res.status(400).send('ERROR')
    return;
  }
  if(alumnos.filter((e)=>{if(e.a===a){return e}}).length>0){
    res.status(400).send('ERROR')
    return;
  }
  const alumno = { id: ++alumnosMaxId, a, b,c,d, fecha: new Date() };
  alumnos.push(alumno);
  res.status(201).send({ alumno });
});

// PUT /areas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b, c, d } = req.body;
  
  if(b<=0||c<=0||d<=0){
    res.status(400).send('ERROR')
    return;
  }
  
  if(alumnos.filter((e)=>{if(e.a===a && e.id!=id){return e}}).length>0){
    res.status(400).send('ERROR')
    return;
  }

  const alumnoModificado = { id, a, b,c,d, fecha: new Date() };
  alumnos = alumnos.map((alumno) => (alumno.id === id ? alumnoModificado : alumno));
  res.status(200).send({ alumno: alumnoModificado });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  alumnos = alumnos.filter((alumno) => alumno.id !== id);
  res.status(200).send({ id });
});

export default router;
