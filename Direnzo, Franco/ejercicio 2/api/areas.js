import express from "express";

const router = express.Router();

let areas = [
];
let areasMaxId = 0;

// GET /areas
router.get("/", (req, res) => {
  res.send({ areas });
});

// GET /areas/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const area = areas.find((area) => area.id == id);
  res.send({ area });
});

// POST /areas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  const area = { id: ++areasMaxId, a, b, resultado: a * b, fecha: new Date() };
  areas.push(area);
  res.status(201).send({ area });
});

// PUT /areas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const areaModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  areas = areas.map((area) => (area.id === id ? areaModificada : area));
  res.status(200).send({ area: areaModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  areas = areas.filter((area) => area.id !== id);
  res.status(200).send({ id });
});

export default router;
