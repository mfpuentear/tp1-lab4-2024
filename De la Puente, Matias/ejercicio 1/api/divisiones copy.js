import express from "express";

const router = express.Router();

let divisiones = []; // Almacenará el historial de divisiones
let divisionesMaxId = 0;

// GET /divisiones
router.get("/", (req, res) => {
  res.send({ divisiones });
});

// GET /divisiones/:id
router.get("/:id", (req, res) => {
  // Obtiene el id de la ruta
  const id = req.params.id;

  // Busca la división con el id de la ruta
  const division = divisiones.find((division) => division.id == id);

  // Devuelve la división encontrada
  res.send({ division });
});

// POST /divisiones
router.post("/", (req, res) => {
  const { a, b } = req.body;

  // Validación para evitar divisiones por cero
  if (b === 0) {
    return res.status(400).send({ error: "No se puede dividir por cero" });
  }

  const division = {
    id: ++divisionesMaxId,
    a,
    b,
    resultado: a / b,
    fecha: new Date(),
  };
  
  divisiones.push(division);
  res.status(201).send({ division });
});

// PUT /divisiones/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  // Validación para evitar divisiones por cero en la modificación
  if (b === 0) {
    return res.status(400).send({ error: "No se puede dividir por cero" });
  }

  const divisionModificada = {
    id,
    a,
    b,
    resultado: a / b,
    fecha: new Date(),
  };

  // Actualiza la división en el array
  divisiones = divisiones.map((division) =>
    division.id === id ? divisionModificada : division
  );

  res.status(200).send({ division: divisionModificada });
});

// DELETE /divisiones/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  divisiones = divisiones.filter((division) => division.id !== id);
  res.status(200).send({ id });
});

export default router;
