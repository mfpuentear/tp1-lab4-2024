import express from "express";

const router = express.Router();
let calculos = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(calculos);
});

router.post("/", (req, res) => {
  const { base, altura } = req.body;
  const perimetro = (base + altura) * 2;
  const area = base * altura;
  const calculoNuevo = {
    id,
    base: base,
    altura: altura,
    perimetro: perimetro,
    area: area,
  };

  calculos.push(calculoNuevo);
  id++;
  res.status(201).json(calculoNuevo);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { base, altura } = req.body;

  const calculo = calculos.find((c) => c.id === id);
  if (!calculo) {
    res.status(404).json({ error: "El calculo no fue encontrado" });
    return;
  }

  calculo.base = base;
  calculo.altura = altura;
  calculo.perimetro = (base + altura) * 2;
  calculo.area = base * altura;

  calculos = calculos.map((c) => (c.id === id ? calculo : c));

  res.json(calculo);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  calculos = calculos.filter((c) => c.id !== id);
  res.send().status(410);
});

export default router;
