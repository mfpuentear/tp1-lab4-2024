import express from "express";

const router = express.Router();

let sumas = [];
let sumasMaxId = 0;

// GET /sumas
router.get("/", (req, res) => {
  res.send({ data: sumas });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const suma = sumas.find((suma) => suma.id == id);
  res.send({ data: suma });
});

// POST /sumas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  const suma = { id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ data: suma });
});

// PUT /sumas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const sumaModificada = { id, a, b, resultado: a + b, fecha: new Date() };

  sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
  res.status(200).send({ data: sumaModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});

export default router;
