import express from 'express'

const router = express.Router();

//cambio de signo (/)

let sumas = [];
let sumasMaxId = sumas.length > 0 ? Math.max(...restas.map((r) => r.id)) : 0;

// GET /sumas
router.get("/", (req, res) => {
  res.send({ sumas });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la suma con id de la ruta
  const suma = sumas.find((suma) => suma.id == id);

  // Devuelvo la suma encontrada
  res.send({ suma });
});

// POST /sumas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  if (b === 0) { return res.status(400).send({mensaje: "No se divide por 0"})}
  const suma = { id: ++sumasMaxId, a, b, resultado: a / b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ suma });
});

// PUT /sumas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const sumaModificada = { id, a, b, resultado: a / b, fecha: new Date() };

  sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
  res.status(200).send({ suma: sumaModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});



export default router;