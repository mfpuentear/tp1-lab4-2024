import express from "express";

export const multiplicacionesRouter = express.Router();

let multiplicaciones = [
  //  { id: 1, a: 2, b: 2, resultado: 4 },
  //  { id: 2, a: 4, b: 3, resultado: 12 },
];
let multiplicacionesMaxId = 0;

// GET /multiplicaciones
multiplicacionesRouter.get("/", (req, res) => {
  res.send({ data: multiplicaciones });
});

// GET /multiplicaciones/:id
multiplicacionesRouter.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la suma con id de la ruta
  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);

  // Devuelvo la suma encontrada
  res.send({ data: multiplicacion });
});

// POST /multiplicaciones
multiplicacionesRouter.post("/", (req, res) => {
  // Obtengo a y b
  const { a, b } = req.body;

  // Verifico que b sea distinto de 0
  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
  }

  // Creo objeto multiplicacion y lo agrego al arreglo y al cliente
  const multiplicacion = {
    id: ++multiplicacionesMaxId,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ data: multiplicacion });
});

// PUT /multiplicaciones/:id
multiplicacionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const suma = multiplicaciones.find((suma) => suma.id === id);
  suma.a = a;
  suma.b = b;
  suma.resultado = a + b;
  suma.fecha = new Date();
  */
  const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  // con forEach
  /*
  multiplicaciones.forEach((suma, index) => {
    if (suma.id === id) {
      multiplicaciones[index] = sumaModificada;
    }
  });
  */
  // con map
  multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : data));
  res.status(200).send({ data : multiplicacionModificada });
});

// DELETE /multiplicaciones/:id
multiplicacionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicaciones = multiplicaciones.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});