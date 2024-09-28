import express from "express";

const router = express.Router();

let multiplicaciones = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(multiplicaciones);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;
  //   console.log(n1);
  //   console.log(n2);
  const nuevaMultiplicacion = {
    id,
    n1,
    n2,
    resultado: n1 * n2,
    fechaCreado: new Date(),
    fechaModificada: null,
  };
  multiplicaciones.push(nuevaMultiplicacion);
  id = id + 1;
  res.status(200).json({ n1, n2 });
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;
  const multiplicacion = multiplicaciones.find((elem) => elem.id === id);
  if (!multiplicacion) {
    res.status(404).json({ error: "la multiplicacion no se a encontrado" });
  }

  const multiplicionModificada = {
    id: multiplicacion.id,
    n1,
    n2,
    resultado: n1 * n2,
    fechaCreado: multiplicacion.fechaCreado,
    fechaModificada: new Date(),
  };
  multiplicaciones = multiplicaciones.map((elem) =>
    elem.id === id ? multiplicionModificada : elem
  );
  res.status(200).json(multiplicionModificada);
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const multiplicacion = multiplicaciones.find((elem) => elem.id === id);
  if (!multiplicacion) {
    res.status(404).json({ error: "la multiplicacion no se a encontrado" });
  }
  multiplicaciones = multiplicaciones.filter((elem) => elem.id !== id);
  res.status(410).send();
});

export default router;
