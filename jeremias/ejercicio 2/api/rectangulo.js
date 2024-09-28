import express from "express";

export const rectangulosRoute = express.Router();

let rectangulos = [];
let rectangulosMaxId = 0;

rectangulosRoute.get("/", (req, res) => {
  return res.json({ data: rectangulos });
});

rectangulosRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const rectangulo = rectangulos.find((rect) => rect.id === parseInt(id));

  if (!rectangulo) {
    return res.status(404).send({ mensaje: "Rectángulo no encontrado" });
  }

  return res.json({ data: rectangulo });
});

rectangulosRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const perimetro = 2 * (a + b);
  const superficie = a * b;
  const nuevoRectangulo = {
    id: ++rectangulosMaxId,
    a,
    b,
    perimetro,
    superficie,
  };

  rectangulos.push(nuevoRectangulo);
  return res.status(201).json({ data: nuevoRectangulo });
});

rectangulosRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  rectangulos = rectangulos.filter((rect) => rect.id !== parseInt(id));

  return res.status(202).send({ id });
});

rectangulosRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const perimetro = 2 * (a + b);
  const superficie = a * b;

  const rectanguloActualizado = {
    id: parseInt(id),
    a,
    b,
    perimetro,
    superficie,
  };

  rectangulos = rectangulos.map((rect) =>
    rect.id === rectanguloActualizado.id ? rectanguloActualizado : rect
  );

  return res.status(200).json({ data: rectanguloActualizado });
});