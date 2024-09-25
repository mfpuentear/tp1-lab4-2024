import express from "express"

const router = express.Router();

let multiplicaciones = [
  { id: 1, a: 2, b: 5, resultado: 10 },
  { id: 2, a: 20, b: 10, resultado: 200 },
  { id: 3, a: 12, b: 55, resultado: 660 },
];
let multiplicacionesMaxId = 0;

router.get("/", (req, res) => {
  res.send({ multiplicaciones });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);

  res.send({ multiplicacion });
});

router.post("/", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const multiplicacion = { id: ++multiplicacionesMaxId, a, b, resultado: a * b, fecha: new Date() };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ multiplicacion });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  
  const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  
  multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion));
  res.status(200).send({ multiplicacion: multiplicacionModificada });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicaciones = multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id);
  res.status(200).send({ id });
});

export default router;