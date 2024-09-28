import express from "express";

export const perimetrosRouter = express.Router();

let perimetros = [{ id: 5, base: 6, altura: 15, resultado: 21 }];

let perimetrosMaxId = 0;

perimetrosRouter.get("/", (req, res) => {
  res.send({ perimetros });
});

perimetrosRouter.get("/", (req, res) => {
  const id = req.params.id;

  const perimetro = perimetros.find((perimetro) => perimetro.id == id);

  res.send({ perimetro });
});

perimetrosRouter.post("/", (req, res) => {
  const { base, altura } = req.body;
  const perimetro = {
    id: ++perimetrosMaxId,
    base,
    altura,
    resultado: base * 2 + altura * 2,
    fecha: new Date(),
  };
  perimetros.push(perimetro);
  res.status(201).send({ perimetro });
});

perimetrosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { base, altura } = req.body;
  const perimetroModificado = {
    id,
    base,
    altura,
    resultado: base * 2 + altura * 2,
    fecha: new Date(),
  };
  perimetros = perimetros.map((perimetro) =>
    perimetro.id == id ? perimetroModificado : perimetro
  );
  res.status(200).send({ perimetro: perimetroModificado });
});

perimetrosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  perimetros = perimetros.filter((perimetro) => perimetro.id !== id);
  res.status(200).send({ id });
});
