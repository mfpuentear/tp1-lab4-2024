import express from "express";

export const divisiones = express.Router();

let listaDivisiones = [];
let divisionesId = 0;

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
      idDivision: divisionesId++,
      a: a,
      b: b,
      resultado: a / b,
    };

    listaDivisiones.push(division);

    res.status(201).send({ division });
  }
});

divisiones.delete("/listaDivisiones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaDivisiones = listaDivisiones.filter((division) => division.idDivision !== id);
  res.status(200).send({ id });
});