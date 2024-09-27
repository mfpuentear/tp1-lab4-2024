import express from "express";

export const superficiesRouter = express.Router();

let superficies = [
  //  { id: 1, a: 2, b: 2, resultado: 4 },
  //  { id: 2, a: 4, b: 3, resultado: 12 },
];
let superficiesMaxId = superficies.length;

// GET /superficies
superficiesRouter.get("/", (req, res) => {
  res.send({ data: superficies });
});

// POST /superficies
superficiesRouter.post("/", (req, res) => {
  // Obtengo a y b
  const { a, b } = req.body;
  // Creo objeto superficie y lo agrego al arreglo y al cliente
  const superficie = {
    id: ++superficiesMaxId,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  superficies.push(superficie);
  res.status(201).send({ data: superficie });
});

// PUT /superficies/:id
superficiesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  const superficieModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  superficies = superficies.map((superficie) => (superficie.id === id ? superficieModificada : data));
  res.status(200).send({ data : superficieModificada });
});

// DELETE /superficies/:id
superficiesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  superficies = superficies.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});