import express from "express";

export const superficieRouter = express.Router();

let superficies = [{ id: 5, base: 6, altura: 15, resultado: 21 }];

let superficiesMaxId = 0;

superficieRouter.get("/", (req, res) => {
  res.send({ superficies });
});

superficieRouter.get("/", (req, res) => {
  const id = req.params.id;

  const superficie = superficies.find((superficie) => superficie.id == id);

  res.send({ superficie });
});

superficieRouter.post("/", (req, res) => {
  const { base, altura } = req.body;
  const superficie = {
    id: ++superficiesMaxId,
    base,
    altura,
    resultado: base * 2 + altura * 2,
    fecha: new Date(),
  };
  superficies.push(superficie);
  res.status(201).send({ superficie });
});

superficieRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { base, altura } = req.body;
  const superficieModificada = {
    id,
    base,
    altura,
    resultado: base * 2 + altura * 2,
    fecha: new Date(),
  };
  superficies = superficies.map((superficie) =>
    superficie.id == id ? superficieModificada : superficie
  );
  res.status(200).send({ superficie: superficieModificada });
});

superficieRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  superficies = superficies.filter((superficie) => superficie.id !== id);
  res.status(200).send({ id });
});
