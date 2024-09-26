import express from "express";

const restaRoute = express.Router();

let restas = [
  { id: 1, a: 2, b: 5, resultado: 7 },
  { id: 2, a: 6, b: 81, resultado: 87 },
  { id: 5, a: 12, b: 55, resultado: 87 },
];
let restasMaxId = 0;

// GET /restas
router.get("/", (req, res) => {
  res.send({ restas });
});

// GET /restas/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la resta con id de la ruta
  const resta = restas.find((resta) => resta.id == id);

  // Devuelvo la resta encontrada
  res.send({ resta });
});

// POST /restas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  const resta = { id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date() };
  restas.push(resta);
  res.status(201).send({ resta });
});

// PUT /restas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const resta = restas.find((resta) => resta.id === id);
  resta.a = a;
  resta.b = b;
  resta.resultado = a - b;
  resta.fecha = new Date();
  */
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  // con forEach
  /*
  restas.forEach((resta, index) => {
    if (resta.id === id) {
      restas[index] = restaModificada;
    }
  });
  */
  // con map
  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send({ resta: restaModificada });
});

// DELETE /restas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

export default router;
