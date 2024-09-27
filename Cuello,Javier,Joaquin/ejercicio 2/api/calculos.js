import express from "express";

const router = express.Router();
let calculos = [];
let id = 0;

router.get("/", (req, res) => {
  res.json(calculos);
});

router.post("/", (req, res) => {
  const { base, altura } = req.body;

  if (!base || !altura || isNaN(base) || isNaN(altura)) {
    return res.status(400).json({ error: "Base y altura deben ser números válidos" });
  }

  const perimetro = (base + altura) * 2;
  const area = base * altura;

  id++;
  const nuevoCalculo = {
    id,
    base: base,
    altura: altura,
    perimetro: perimetro,
    area: area,
  };

  calculos.push(nuevoCalculo);
  res.status(201).json(nuevoCalculo);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { base, altura } = req.body;

  if (!base || !altura || isNaN(base) || isNaN(altura)) {
    return res.status(400).json({ error: "Base y altura deben ser números válidos" });
  }

  const calculo = calculos.find((c) => c.id === id);
  if (!calculo) {
    return res.status(404).json({ error: "Calculo no encontrado" });
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

  const calculoExistente = calculos.some((c) => c.id === id);
  if (!calculoExistente) {
    return res.status(404).json({ error: "Calculo no encontrado" });
  }

  calculos = calculos.filter((c) => c.id !== id);
  res.status(204).json({ message: "Calculo eliminado correctamente" });
});

export default router;
