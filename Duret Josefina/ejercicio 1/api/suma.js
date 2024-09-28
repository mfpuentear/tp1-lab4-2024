import express from "express";

const router = express.Router();
let sumas = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(sumas);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;

  const nuevaSuma = {
    id,
    n1,
    n2,
    resultado: n1 + n2,
    fechaCreado: new Date(),
    fechaModificado: null,
  };
  sumas.push(nuevaSuma);
  res.status(200).json(nuevaSuma);
  id++;
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;

  const suma = sumas.find((s) => s.id === id);
  if (!suma) {
    res.status(404).json({ error: "Suma no encontrada" });
    return;
  }
  const sumaModificada = {
    id: suma.id,
    n1,
    n2,
    resultado: n1 + n2,
    fechaCreado: suma.fechaCreado,
    fechaModificado: new Date(),
  };
  sumas = sumas.map((s) => (s.id === id ? sumaModificada : s));
  res.status(200).json(sumaModificada);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const suma = sumas.find((s) => s.id === id);
  if (!suma) {
    res.status(404).json({ error: "Suma no encontrada" });
    return;
  }
  sumas = sumas.filter((s) => s.id !== id);
  res.status(410).send();
});

export default router;
