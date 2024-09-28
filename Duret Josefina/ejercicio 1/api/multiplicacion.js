import express from "express";

const router = express.Router();
let multiplicaciones = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(multiplicaciones);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;

  const nuevaMultiplicacion = {
    id,
    n1,
    n2,
    resultado: n1 * n2,
    fechaCreado: new Date(),
    fechaModificado: null,
  };
  multiplicaciones.push(nuevaMultiplicacion);
  res.status(200).json(nuevaMultiplicacion);
  id++;
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;

  const multiplicacion = multiplicaciones.find((s) => s.id === id);
  if (!multiplicacion) {
    res.status(404).json({ error: "multiplicacion no encontrada" });
    return;
  }
  const multipliacionModificada = {
    id: multiplicacion.id,
    n1,
    n2,
    resultado: n1 * n2,
    fechaCreado: multiplicacion.fechaCreado,
    fechaModificado: new Date(),
  };
  multiplicaciones = multiplicaciones.map((s) =>
    s.id === id ? multipliacionModificada : s
  );
  res.status(200).json(multipliacionModificada);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const multiplicacion = multiplicaciones.find((s) => s.id === id);
  if (!multiplicacion) {
    res.status(404).json({ error: "multiplicacion no encontrada" });
    return;
  }
  multiplicaciones = multiplicaciones.filter((s) => s.id !== id);
  res.status(410).send();
});

export default router;
