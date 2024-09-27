import express from "express";

const router = express.Router();

let restas = [
];
let restasMaxId = 0;

// GET /sumas
router.get("/", (req, res) => {
  res.send({ restas });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la suma con id de la ruta
  const resta = restas.find((resta) => resta.id == id);

  // Devuelvo la suma encontrada
  res.send({ resta });
});

// POST /sumas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  const resta = { id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date() };
  restas.push(resta);
  res.status(201).send({ resta });
});

// PUT /sumas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const suma = sumas.find((suma) => suma.id === id);
  suma.a = a;
  suma.b = b;
  suma.resultado = a + b;
  suma.fecha = new Date();
  */
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  // con forEach
  /*
  sumas.forEach((suma, index) => {
    if (suma.id === id) {
      sumas[index] = sumaModificada;
    }
  });
  */
  // con map
  restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send({ resta: restaModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

export default router;
