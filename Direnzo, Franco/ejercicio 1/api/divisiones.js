import express from "express";

const router = express.Router();

let divisiones = [
  { id: 1, a: 2, b: 2, resultado: 1 },
  { id: 2, a: 3, b: 4, resultado: 0.75 }
];
let divisionesMaxId = 0;

// GET /sumas
router.get("/", (req, res) => {
  res.send({ divisiones });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la suma con id de la ruta
  const suma = divisiones.find((division) => division.id == id);

  // Devuelvo la suma encontrada
  res.send({ division });
});

// POST /sumas
router.post("/", (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
  }else{
    const division = { id: ++divisionesMaxId, a, b, resultado: a / b, fecha: new Date() };
    divisiones.push(division);
    res.status(201).send({ division });
  }
});

// PUT /sumas/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
  }else{
    const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() };
    divisiones = divisiones.map((division) => (division.id === id ? divisionModificada : division));
    res.status(200).send({ division: divisionModificada });
  }
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});

export default router;
