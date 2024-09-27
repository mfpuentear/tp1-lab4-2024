import express from "express";

export const rectangulos = express.Router();

let listaRectangulos = [];
let id = 0;

rectangulos.get("/listaRectangulos", (req, res) => {
  res.send(listaRectangulos);
});

rectangulos.post("/listaRectangulos", (req, res) => {
  const { base, altura, tipo } = req.body;

  if (
    typeof base != "number" ||
    typeof altura != "number" ||
    isNaN(base) ||
    isNaN(altura) ||
    base <= 0 ||
    altura <= 0
  ) {
    res.status(400).send("Verifique los datos enviados");
  } else {
    const rectangulo = {
      id: id++,
      base: base,
      altura: altura,
      perimetro: 2 * (base + altura),
      superficie: base * altura,
      tipo: tipo,
    };

    listaRectangulos.push(rectangulo);

    res.status(201).send({ rectangulo });
  }
});

rectangulos.delete("/listaRectangulos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaRectangulos = listaRectangulos.filter(
    (rectangulo) => rectangulo.id !== id
  );
  res.status(200).send({ id });
});

rectangulos.put("/listaRectangulos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { base, altura, tipo } = req.body;

  const rectangulo = listaRectangulos.find(
    (rectangulo) => rectangulo.id === id
  );

  if (rectangulo && typeof base === "number" && typeof altura === "number" && base > 0 && altura > 0) {
    rectangulo.base = base;
    rectangulo.altura = altura;
    rectangulo.perimetro = 2 * (base + altura);
    rectangulo.superficie = base * altura;
    rectangulo.tipo = tipo;
    res.status(200).send({ rectangulo });
  } else {
    res.status(400).send("Datos incorrectos o no encontrados");
  }
});
