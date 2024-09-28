import express from "express";

export const restasRouter = express.Router();

let restas = [];
let restasMaxId = 0;

// GET /recurso
restasRouter.get("/", (req, res) => {
  res.send({ restas });
});

restasRouter.get("/:id", (req, res) => {
  //obtengo id de la ruta
  const id = req.params.id;
  // busco la resta con id
  const resta = restas.find((resta) => resta.id == id);
  // devuelvo la resta encontrada
  res.send({ resta });
});

// POST
restasRouter.post("/", (req, res) => {
  const a = req.body.a;
  if (a == null) {
    res.status(404).send({ mensaje: "Completar el campo a" });
  }
  const b = req.body.b;
  if (b == null) {
    res.status(404).send({ mensaje: "Completar el campo b" });
  }
  const resta = {
    id: ++restasMaxId,
    a,
    b,
    resultado: a - b,
    fecha: new Date(),
  };
  restas.push(resta);
  res.status(201).send({ resta });
});

//PUT /restas/:id
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

  restas.forEach((resta, index) => {
    if (resta.id === id) {
      restas[index] = restaModificada;
    }
  });
  // con map
  //restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
  res.status(200).send({ resta: restaModificada });
});

//DELETE
restasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  restas = restas.filter((resta) => resta.id !== id);
  res.status(200).send({ id });
});

