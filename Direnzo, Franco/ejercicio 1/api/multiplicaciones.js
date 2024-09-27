import express from "express";

const router = express.Router();

let multis = [
  { id: 1, a: 2, b: 5, resultado: 10 },
  { id: 2, a: 6, b: 81, resultado: 486 },
  { id: 5, a: 12, b: 55, resultado: 660 },
];
let multisMaxId = 0;

// GET /sumas
router.get("/", (req, res) => {
  res.send({ multis });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la suma con id de la ruta
  const multi = multis.find((multi) => multi.id == id);

  // Devuelvo la suma encontrada
  res.send({ suma });
});

// POST /sumas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  const multi = { id: ++multisMaxId, a, b, resultado: a * b, fecha: new Date() };
  multis.push(multi);
  res.status(201).send({ multi });
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
  const multiModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  // con forEach
  /*
  sumas.forEach((suma, index) => {
    if (suma.id === id) {
      sumas[index] = sumaModificada;
    }
  });
  */
  // con map
  multis = multis.map((multi) => (multi.id === id ? multiModificada : multi));
  res.status(200).send({ multi: multiModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multis = multis.filter((multi) => multi.id !== id);
  res.status(200).send({ id });
});

export default router;
