import express from "express";

const router = express.Router();

let divisiones = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(divisiones);
});

router.post("/", (req, res) => {
  const { n1, n2 } = req.body;
  //   console.log(n1);
  //   console.log(n2);
  if (n2 === 0) {
    res.status(400).json({ error: "el denominardor es cero" });
    return;
  }
  const nuevaDivision = {
    id,
    n1,
    n2,
    resultado: n1 / n2,
    fechaCreado: new Date(),
    fechaModificada: null,
  };
  divisiones.push(nuevaDivision);
  id = id + 1;
  res.status(200).json({ n1, n2 });
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { n1, n2 } = req.body;
  const division = divisiones.find((elem) => elem.id === id);
  if (!division) {
    res.status(404).json({ error: "la division no se a encontrado" });
  }

  const divisionModificada = {
    id: division.id,
    n1,
    n2,
    resultado: n1 / n2,
    fechaCreado: division.fechaCreado,
    fechaModificada: new Date(),
  };
  divisiones = divisiones.map((elem) =>
    elem.id === id ? divisionModificada : elem
  );
  res.status(200).json(divisionModificada);
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const division = divisiones.find((elem) => elem.id === id);
  if (!division) {
    res.status(404).json({ error: "la division no se a encontrado" });
  }
  divisiones = divisiones.filter((elem) => elem.id !== id);
  res.status(410).send();
});

export default router;
