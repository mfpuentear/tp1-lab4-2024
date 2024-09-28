import express from "express";

export const rectangulosRoute = express.Router();

let rectangulos = [{ id: 1, a: 2, b: 2, superficie: 4, perimetro: 8 }];

//mostrar
rectangulosRoute.get("/", (req, res) => {
  return res.json({ data: rectangulos });
});

//encontrar
rectangulosRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const rectangulo = rectangulos.find((rect) => rect.id === parseInt(id));

  if (!rectangulo) {
    return res.status(404).send({ mensaje: "Rectángulo no encontrado" });
  }

  return res.json({ data: rectangulo });
});

//agregar
rectangulosRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const superficie = a * b;
  const perimetro = 2 * superficie;
  const nuevoId =
    rectangulos.length > 0 ? rectangulos[rectangulos.length - 1].id + 1 : 1;
  const nuevoRectangulo = {
    id: nuevoId,
    a,
    b,
    perimetro,
    superficie,
  };

  rectangulos.push(nuevoRectangulo);
  return res.status(201).json({ data: nuevoRectangulo });
});

// eliminar
rectangulosRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  rectangulos = rectangulos.filter((rect) => rect.id !== parseInt(id));

  return res.status(202).send({ id });
});

// editar
rectangulosRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const superficie = a * b;
  const perimetro = 2 * superficie;

  const rectanguloActualizado = {
    id: parseInt(id),
    a,
    b,
    superficie,
    perimetro,
  };

  rectangulos = rectangulos.map((rect) =>
    rect.id === rectanguloActualizado.id ? rectanguloActualizado : rect
  );

  return res.status(200).json({ data: rectanguloActualizado });
});
