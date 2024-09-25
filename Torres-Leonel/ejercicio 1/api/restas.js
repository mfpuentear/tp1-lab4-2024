import express from "express"

const router = express.Router();

let restas = [
  { id: 1, a: 2, b: 5, resultado: -3 },
  { id: 2, a: 20, b: 10, resultado: 10 },
  { id: 3, a: 12, b: 55, resultado: -43 },
];
let restasMaxId = 0;

router.get("/", (req, res) => {
  res.send({ restas });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const resta = restas.find((resta) => resta.id == id);

  res.send({ resta });
});

router.post("/", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const resta = { id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date() };
  restas.push(resta);
  res.status(201).send({ resta });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  
  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send({ resta: restaModificada });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

export default router;