import express from "express";

const router = express.Router();
let divisiones = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(divisiones);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;

  if (n2 === 0) {
    res.status(400).json({ error: "No se puede divir en 0" });
    return;
  }

  const nuevaDivision = {
    id,
    n1,
    n2,
    resultado: n1 / n2,
    fechaCreado: new Date(),
    fechaModificado: null,
  };
  divisiones.push(nuevaDivision);
  res.status(200).json(nuevaDivision);
  id++;
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;

  const division = divisiones.find((s) => s.id === id);
  if (!division) {
    res.status(404).json({ error: "division no encontrada" });
    return;
  }
  const divisionModificada = {
    id: division.id,
    n1,
    n2,
    resultado: n1 / n2,
    fechaCreado: division.fechaCreado,
    fechaModificado: new Date(),
  };
  divisiones = divisiones.map((s) => (s.id === id ? divisionModificada : s));
  res.status(200).json(divisionModificada);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const division = divisiones.find((s) => s.id === id);
  if (!division) {
    res.status(404).json({ error: "división no encontrada" });
    return;
  }
  divisiones = divisiones.filter((s) => s.id !== id);
  res.status(410).send();
});

export default router;
