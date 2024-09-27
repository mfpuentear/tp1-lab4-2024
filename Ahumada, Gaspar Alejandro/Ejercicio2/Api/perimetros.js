import express from "express";

export const perimetrosRouter = express.Router();

let perimetros = [
  //  { id: 1, a: 2, b: 2, resultado: 4 },
  //  { id: 2, a: 4, b: 3, resultado: 12 },
];
let perimetrosMaxId = 0;

// GET /perimetros
perimetrosRouter.get("/", (req, res) => {
  res.send({ data: perimetros });
});

// GET /perimetros/:id
perimetrosRouter.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la suma con id de la ruta
  const perimetro = perimetros.find((perimetro) => perimetro.id == id);

  // Devuelvo la suma encontrada
  res.send({ data: perimetro });
});

// POST /perimetros
perimetrosRouter.post("/", (req, res) => {
  // Obtengo a y b
  const { a, b } = req.body;

  // Verifico que b sea distinto de 0
  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
  }

  // Creo objeto perimetro y lo agrego al arreglo y al cliente
  const perimetro = {
    id: ++perimetrosMaxId,
    a,
    b,
    resultado: 2* (a + b),
    fecha: new Date(),
  };
  perimetros.push(perimetro);
  res.status(201).send({ data: perimetro });
});

// PUT /perimetros/:id
perimetrosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const suma = perimetros.find((suma) => suma.id === id);
  suma.a = a;
  suma.b = b;
  suma.resultado = a + b;
  suma.fecha = new Date();
  */
  const perimetroModificada = { id, a, b, resultado: 2 * (a + b), fecha: new Date() };
  // con forEach
  /*
  perimetros.forEach((suma, index) => {
    if (suma.id === id) {
      perimetros[index] = sumaModificada;
    }
  });
  */
  // con map
  perimetros = perimetros.map((perimetro) => (perimetro.id === id ? perimetroModificada : data));
  res.status(200).send({ data : perimetroModificada });
});

// DELETE /perimetros/:id
perimetrosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  perimetros = perimetros.filter((perimetro) => perimetro.id !== id);
  res.status(200).send({ id });
});