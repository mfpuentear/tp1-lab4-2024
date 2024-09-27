import express from "express";

export const multiplicaciones = express.Router();

let listaMultiplicaciones = [];
let id = 0;

multiplicaciones.get("/listaMultiplicaciones", (req, res) => {
  res.send(listaMultiplicaciones);
});

multiplicaciones.post("/listaMultiplicaciones", (req, res) => {
  const { a, b } = req.body;

  if (typeof a != "number" || typeof b != "number" || isNaN(a) || isNaN(b)) {
    res.status(400).send("Verifique los datos enviados");
    
  } else {
    const multiplicacion = {
      id: id++,
      a: a,
      b: b,
      resultado: (a * b),
    };
    
    listaMultiplicaciones.push(multiplicacion);

    res.status(201).send({ multiplicacion });
  }
});

multiplicaciones.delete("/listaMultiplicaciones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaMultiplicaciones = listaMultiplicaciones.filter((multiplicacion) => multiplicacion.id !== id);
  res.status(200).send({ id });
});

multiplicaciones.put("/listaMultiplicaciones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const multiplicacion = listaMultiplicaciones.find((multiplicacion) => multiplicacion.id === id);

  if (multiplicacion && typeof a === "number" && typeof b === "number") {
    multiplicacion.a = a;
    multiplicacion.b = b;
    multiplicacion.resultado = a * b;
    res.status(200).send({ multiplicacion });
  } else {
    res.status(400).send("Datos incorrectos o multiplicación no encontrada");
  }
});
