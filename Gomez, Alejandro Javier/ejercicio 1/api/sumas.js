import express from "express";

export const sumas = express.Router();

let listaSumas = [];
let id = 0;

sumas.get("/listaSumas", (req, res) => {
  res.send(listaSumas);
});

sumas.post("/listaSumas", (req, res) => {
  const { a, b } = req.body;

  if (typeof a != "number"  || typeof b != "number" || isNaN(a) || isNaN(b)) {
    res.status(400).send("Verifique los datos enviados");

  } else {
    const suma = {
      id: id++,
      a: a,
      b: b,
      resultado: a + b,
    };
    
    listaSumas.push(suma);

    res.status(201).send({ suma });
  }
});

sumas.delete("/listaSumas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaSumas = listaSumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});

sumas.put("/listaSumas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const suma = listaSumas.find((suma) => suma.id === id);

  if (suma && typeof a === "number" && typeof b === "number") {
    suma.a = a;
    suma.b = b;
    suma.resultado = a + b;
    res.status(200).send({ suma });
  } else {
    res.status(400).send("Datos incorrectos o suma no encontrada");
  }
});
