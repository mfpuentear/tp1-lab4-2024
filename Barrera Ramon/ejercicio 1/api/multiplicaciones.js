import express from "express";

const multiplicacionesRoute = express.Router();

let multiplicaciones = [
  { id: 1, a: 2, b: 5, resultado: 7 },
  { id: 2, a: 6, b: 81, resultado: 87 },
  { id: 5, a: 12, b: 55, resultado: 87 },
];
let multiplicacionesMaxId = 0;

// GET /multiplicaciones
router.get("/", (req, res) => {
  res.send({ multiplicaciones });
});

// GET /multiplicaciones/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la multiplicacion con id de la ruta
  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);

  // Devuelvo la multiplicacion encontrada
  res.send({ multiplicacion });
});

// POST /multiplicaciones
router.post("/", (req, res) => {
  const { a, b } = req.body;
  const multiplicacion = { id: ++multiplicacionesMaxId, a, b, resultado: a * b, fecha: new Date() };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ multiplicacion });
});

// PUT /multiplicaciones/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id === id);
  multiplicacion.a = a;
  multiplicacion.b = b;
  multiplicacion.resultado = a * b;
  multiplicacion.fecha = new Date();
  */
  const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() };
  // con forEach
  /*
  multiplicaciones.forEach((multiplicacion, index) => {
    if (multiplicacion.id === id) {
      multiplicaciones[index] = multiplicacionModificada;
    }
  });
  */
  // con map
  multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion));
  res.status(200).send({ multiplicacion: multiplicacionModificada });
});

// DELETE /multiplicaciones/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicaciones = multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id);
  res.status(200).send({ id });
});

export default router;
