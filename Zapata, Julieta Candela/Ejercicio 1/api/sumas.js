import express from "express";

export const sumasRouter = express.Router();

let sumas = [];
let sumasMaxId = 0;

// GET /recurso
sumasRouter.get("/", (req, res) => {
  res.send({ sumas });
});

sumasRouter.get("/:id", (req, res) => {
  //obtengo id de la ruta
  const id = req.params.id;
  // busco la suma con id
  const suma = sumas.find((suma) => suma.id == id);
  // devuelvo la suma encontrada
  res.send({ suma });
});

// POST
sumasRouter.post("/", (req, res) => {
  const a = req.body.a;
  if (a == null) {
    res.status(404).send({ mensaje: "Completar el campo a" });
  }
  const b = req.body.b;
  if (b == null) {
    res.status(404).send({ mensaje: "Completar el campo b" });
  }
  const suma = { id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ suma });
});

//PUT /sumas/:id
sumasRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const suma = sumas.find((suma) => suma.id === id);
  suma.a = a;
  suma.b = b;
  suma.resultado = a + b;
  suma.fecha = new Date();
  */
  const sumaModificada = { id, a, b, resultado: a + b, fecha: new Date() };
  // con forEach

  sumas.forEach((suma, index) => {
    if (suma.id === id) {
      sumas[index] = sumaModificada;
    }
  });
  // con map
  //sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
  res.status(200).send({ suma: sumaModificada });
});

//DELETE
sumasRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});

