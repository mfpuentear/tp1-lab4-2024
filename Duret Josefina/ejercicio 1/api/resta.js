import express from "express";

const router = express.Router();
let restas = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(restas);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;

  const nuevaResta = {
    id,
    n1,
    n2,
    resultado: n1 - n2,
    fechaCreado: new Date(),
    fechaModificado: null,
  };
  restas.push(nuevaResta);
  res.status(200).json(nuevaResta);
  id++;
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;

  const resta = restas.find((s) => s.id === id);
  if (!resta) {
    res.status(404).json({ error: "resta no encontrada" });
    return;
  }
  const restaModificada = {
    id: resta.id,
    n1,
    n2,
    resultado: n1 - n2,
    fechaCreado: resta.fechaCreado,
    fechaModificado: new Date(),
  };
  restas = restas.map((s) => (s.id === id ? restaModificada : s));
  res.status(200).json(restaModificada);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const resta = restas.find((s) => s.id === id);
  if (!resta) {
    res.status(404).json({ error: "resta no encontrada" });
    return;
  }
  restas = restas.filter((s) => s.id !== id);
  res.status(410).send();
});

export default router;
