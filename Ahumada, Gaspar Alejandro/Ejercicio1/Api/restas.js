import express from "express";

export const restasRouter = express.Router();

let restas = [
  //  { id: 1, a: 2, b: 2, resultado: 0 },
  //  { id: 2, a: 4, b: 3, resultado: 1 },
];
let restasMaxId = 0;

// GET /restas
restasRouter.get("/", (req, res) => {
  res.send({ data: restas });
});

// GET /restas/:id
restasRouter.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la resta con id de la ruta
  const resta = restas.find((resta) => resta.id == id);

  // Devuelvo la resta encontrada
  res.send({ data: resta });
});

// POST /restas
restasRouter.post("/", (req, res) => {
  // Obtengo a y b
  const { a, b } = req.body;

  // Verifico que b sea distinto de 0
  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
  }

  // Creo objeto resta y lo agrego al arreglo y al cliente
  const resta = {
    id: ++restasMaxId,
    a,
    b,
    resultado: a - b,
    fecha: new Date(),
  };
  restas.push(resta);
  res.status(201).send({ data: resta });
});

// PUT /restas/:id
restasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const resta = restas.find((resta) => resta.id === id);
  resta.a = a;
  resta.b = b;
  resta.resultado = a + b;
  resta.fecha = new Date();
  */
  const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
  // con forEach
  /*
  restas.forEach((resta, index) => {
    if (resta.id === id) {
      restas[index] = restaModificada;
    }
  });
  */
  // con map
  restas = restas.map((resta) => (resta.id === id ? restaModificada : data));
  res.status(200).send({ data : restaModificada });
});

// DELETE /restas/:id
restasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});