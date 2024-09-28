import express from "express";

const router = express.Router();

let sumas = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(sumas);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;
  //   console.log(n1);
  //   console.log(n2);
  const nuevaSuma = {
    id,
    n1,
    n2,
    resultado: n1 + n2,
    fechaCreado: new Date(),
    fechaModificada: null,
  };
  sumas.push(nuevaSuma);
  id = id + 1;
  res.status(200).json({ n1, n2 });
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;
  const suma = sumas.find((elem) => elem.id === id);
  if (!suma) {
    res.status(404).json({ error: "la suma no se a encontrado" });
  }

  const sumaModificada = {
    id: suma.id,
    n1,
    n2,
    resultado: n1 + n2,
    fechaCreado: suma.fechaCreado,
    fechaModificada: new Date(),
  };
  sumas = sumas.map((elem) => (elem.id === id ? sumaModificada : elem));
  res.status(200).json(sumaModificada);
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const suma = sumas.find((elem) => elem.id === id);
  if (!suma) {
    res.status(404).json({ error: "la suma no se a encontrado" });
  }
  sumas = sumas.filter((elem) => elem.id !== id);
  res.status(410).send();
});

export default router;
