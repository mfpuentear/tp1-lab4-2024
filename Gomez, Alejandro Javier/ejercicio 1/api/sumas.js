import express from "express";

export const sumas = express.Router();

let listaSumas = [];
let sumasId = 0;

sumas.get("/listaSumas", (req, res) => {
  res.send(listaSumas);
});

sumas.post("/listaSumas", (req, res) => {
  const { a, b } = req.body;

  if (typeof a != "number"  || typeof b != "number" || isNaN(a) || isNaN(b)) {
    res.status(400).send("Verifique los datos enviados");

  } else {
    const suma = {
      idSuma: sumasId++,
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
  listaSumas = listaSumas.filter((suma) => suma.idSuma !== id);
  res.status(200).send({ id });
});