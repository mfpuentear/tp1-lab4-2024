import express from "express";

export const rectangulosRouter = express.Router();

let rectangulos = [];
let perimetroMaxId = 0;

rectangulosRouter.get("/", (req, res) => {
  res.send({ rectangulos });
});

rectangulosRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const rectangulo = rectangulos.find((rectangulo) => rectangulo.id == id);
  res.send({ rectangulo });
});

rectangulosRouter.post("/", (req, res) => {
  const { base, altura } = req.body;
  if (base == undefined || altura === undefined)
    res.status(400).send({ mensaje: "falta incluir campos" });
  const perimetro = 2 * (base + altura);
  const area = base * altura;
  const per_ar = {
    id: ++perimetroMaxId,
    base: base,
    altura: altura,
    perimetro: perimetro,
    area: area,
  };
  rectangulos.push(per_ar);
  res.status(201).send({ per_ar });
});

rectangulosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { base, altura } = req.body;
  const perimetro = 2 * (base + altura);
  const area = base * altura;

  const rectanguloModificado = {
    id: id,
    base,
    altura,
    perimetro,
    area,
  };

  rectangulos = rectangulos.map((rect) =>
    rect.id === rectanguloModificado.id ? rectanguloModificado : rect
  );

  res.status(200).json({ rectangulo: rectanguloModificado });
});

rectangulosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  rectangulos = rectangulos.filter((rectangulo) => rectangulo.id !== id);
  res.status(200).send({ id });
});
