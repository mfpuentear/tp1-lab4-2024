import express from "express"

const router = express.Router();

let rectangulos = [
  { id: 1, altura: 2, base: 5, perimetro: 14, superficie:10 },
  { id: 2, altura: 20, base: 10, perimetro: 60, superficie:200 },
  { id: 3, altura: 12, base: 55, perimetro: 134,superficie: 660},
];
let rectangulosMaxId = rectangulos.length;

router.get("/", (req, res) => {
  res.send({ rectangulos });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const rectangulo = rectangulos.find((rectangulo) => rectangulo.id == id);

  res.send({ rectangulo });
});

router.post("/", (req, res) => {
  const altura = req.body.altura;
  const base = req.body.base;
  const rectangulo = { id: ++rectangulosMaxId, altura, base, perimetro: 2*(altura+base),superficie: altura*base, fecha: new Date() };
  rectangulos.push(rectangulo);
  res.status(201).send({ rectangulo });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { altura, base } = req.body;
  
  const rectanguloModificado = { id, altura, base, perimetro: 2*(altura+base), superficie: altura*base, fecha: new Date() };
  
  rectangulos = rectangulos.map((rectangulo) => (rectangulo.id === id ? rectanguloModificado : rectangulo));
  res.status(200).send({ rectangulo: rectanguloModificado });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  rectangulos = rectangulos.filter((rectangulo) => rectangulo.id !== id);
  res.status(200).send({ id });
});

export default router;