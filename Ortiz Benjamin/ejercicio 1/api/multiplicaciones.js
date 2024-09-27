import express from "express";

export const multiplicacionesRouter = express.Router();

let multiplicaciones = [];
let multiplicacionesMaxId = 0;

// GET /recurso
multiplicacionesRouter.get("/", (req, res) => {
  res.send({ multiplicaciones });
});

multiplicacionesRouter.get("/:id", (req, res) => {
  //obtengo id de la ruta
  const id = req.params.id;
  // busco la multiplicacion con id
  const multiplicacion = multiplicaciones.find(
    (multiplicacion) => multiplicacion.id == id
  );
  // devuelvo la multiplicacion encontrada
  res.send({ multiplicacion });
});

// POST
multiplicacionesRouter.post("/", (req, res) => {
  const a = req.body.a;
  if (a == null) {
    res.status(404).send({ mensaje: "falta incluir el campo a" });
  }
  const b = req.body.b;
  if (b == null) {
    res.status(404).send({ mensaje: "falta incluir el campo b" });
  }
  const multiplicacion = {
    id: ++multiplicacionesMaxId,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  multiplicaciones.push(multiplicacion);
  res.status(201).send({ multiplicacion });
});

//PUT /multiplicaciones/:id
multiplicacionesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  // Con find
  /*
  const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id === id);
  multiplicacion.a = a;
  multiplicacion.b = b;
  multiplicacion.resultado = a + b;
  multiplicacion.fecha = new Date();
  */
  const multiplicacionModificada = {
    id,
    a,
    b,
    resultado: a * b,
    fecha: new Date(),
  };
  // con forEach

  multiplicaciones.forEach((multiplicacion, index) => {
    if (multiplicacion.id === id) {
      multiplicaciones[index] = multiplicacionModificada;
    }
  });
  // con map
  //multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion));
  res.status(200).send({ multiplicacion: multiplicacionModificada });
});

//DELETE
multiplicacionesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  multiplicaciones = multiplicaciones.filter(
    (multiplicacion) => multiplicacion.id !== id
  );
  res.status(200).send({ id });
});
