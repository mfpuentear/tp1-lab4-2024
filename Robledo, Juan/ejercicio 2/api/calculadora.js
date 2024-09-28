import express from "express";

const router = express.Router();

let calculos = [
  {
    id: 1,
    ladoA: 7.5,
    ladoB: 5.4,
    perimetro: 25.8,
    superficie: 40.5,
    fecha: new Date(),
  },
  {
    id: 2,
    ladoA: 3,
    ladoB: 2,
    perimetro: 10,
    superficie: 6,
    fecha: new Date(),
  },
  {
    id: 3,
    ladoA: 4,
    ladoB: 4,
    perimetro: 16,
    superficie: 16,
    fecha: new Date(),
  },
];
let calculosIdMax = 3;

const calcPerimetro = (ladoA, ladoB) => {
  return 2 * (ladoA + ladoB);
};

const calcSuperficie = (ladoA, ladoB) => {
  return ladoA * ladoB;
};

// GET /calculos
router.get("/", (req, res) => {
  res.send({ data: calculos });
});

// GET /calculos/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const calculo = calculos.find((c) => c.id == id);

  res.send({ data: calculo });
});

// POST /calculos
router.post("/", (req, res) => {
  const { ladoA, ladoB } = req.body;

  if (ladoA == null || ladoB == null) {
    return res.status(400).send({ error: "Faltan datos" });
  }
  if (isNaN(parseFloat(ladoA)) || isNaN(parseFloat(ladoB))) {
    return res.status(400).send({ error: "Los datos deben ser numéricos" });
  }
  if (ladoA <= 0 || ladoB <= 0) {
    return res.status(400).send({ error: "Los datos deben ser positivos" });
  }

  const calculo = {
    id: ++calculosIdMax,
    ladoA,
    ladoB,
    perimetro: calcPerimetro(ladoA, ladoB),
    superficie: calcSuperficie(ladoA, ladoB),
    fecha: new Date(),
  };
  calculos.push(calculo);
  res.status(201).send({ data: calculo });
});

// PUT /calculos/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { ladoA, ladoB } = req.body;

  if (ladoA == null || ladoB == null) {
    return res.status(400).send({ error: "Faltan datos" });
  }
  if (isNaN(parseFloat(ladoA)) || isNaN(parseFloat(ladoB))) {
    return res.status(400).send({ error: "Los datos deben ser numéricos" });
  }
  if (ladoA <= 0 || ladoB <= 0) {
    return res.status(400).send({ error: "Los datos deben ser positivos" });
  }

  const calculosModificados = {
    id,
    ladoA,
    ladoB,
    perimetro: calcPerimetro(ladoA, ladoB),
    superficie: calcSuperficie(ladoA, ladoB),
    fecha: new Date(),
  };

  calculos = calculos.map((c) => (c.id === id ? calculosModificados : c));
  res.status(200).send({ data: calculosModificados });
});

// DELETE /calculos/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  calculos = calculos.filter((c) => c.id !== id);
  res.status(200).send({ id });
});

export default router;
