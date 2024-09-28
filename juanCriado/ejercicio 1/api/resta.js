import express from "express";

const router = express.Router();

let restas = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(restas);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;
  //   console.log(n1);
  //   console.log(n2);
  const nuevaResta = {
    id,
    n1,
    n2,
    resultado: n1 - n2,
    fechaCreado: new Date(),
    fechaModificada: null,
  };
  restas.push(nuevaResta);
  id = id + 1;
  res.status(200).json({ n1, n2 });
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;
  const resta = restas.find((elem) => elem.id === id);
  if (!resta) {
    res.status(404).json({ error: "la resta no se a encontrado" });
  }

  const restaModificada = {
    id: resta.id,
    n1,
    n2,
    resultado: n1 - n2,
    fechaCreado: resta.fechaCreado,
    fechaModificada: new Date(),
  };
  restas = restas.map((elem) => (elem.id === id ? restaModificada : elem));
  res.status(200).json(restaModificada);
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const resta = restas.find((elem) => elem.id === id);
  if (!resta) {
    res.status(404).json({ error: "la resta no se a encontrado" });
  }
  restas = restas.filter((elem) => elem.id !== id);
  res.status(410).send();
});

export default router;
