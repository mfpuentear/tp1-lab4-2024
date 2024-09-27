import express from "express";

export const divisiones = express.Router();

let listaDivisiones = [];
let id = 0;

divisiones.get("/listaDivisiones", (req, res) => {
  res.send(listaDivisiones);
});

divisiones.post("/listaDivisiones", (req, res) => {
  const { a, b } = req.body;

  if (typeof a != "number" || typeof b != "number" || isNaN(a) || isNaN(b)) {
    res.status(400).send("Verifique los datos enviados");
  } else {

    if (b === 0) {
      res.status(400).send("No se pueden realizar divisiones entre cero");
      return;
    };

    const division = {
      id: id++,
      a: a,
      b: b,
      resultado: (a / b).toFixed(2),
    };

    listaDivisiones.push(division);

    res.status(201).send({ division });
  }
});

divisiones.delete("/listaDivisiones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaDivisiones = listaDivisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});

divisiones.put("/listaDivisiones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const division = listaDivisiones.find((division) => division.id === id);

  if (division && typeof a === "number" && typeof b === "number") {
    if (b === 0) {
      res.status(400).send("No se puede dividir por cero");
    } else {
      division.a = a;
      division.b = b;
      division.resultado = a / b;
      res.status(200).send({ division });
    }
  } else {
    res.status(400).send("Datos incorrectos o división no encontrada");
  }
});
