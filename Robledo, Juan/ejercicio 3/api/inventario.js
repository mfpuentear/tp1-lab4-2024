import express from "express";

const router = express.Router();

let inventario = [
  {
    id: 1,
    nombre: "Tomate",
    precio: 2000,
    fecha: new Date(),
  },
  {
    id: 2,
    nombre: "Papa",
    precio: 1500,
    fecha: new Date(),
  },
  {
    id: 3,
    nombre: "Cebolla",
    precio: 1000,
    fecha: new Date(),
  },
];
let inventarioIdMax = 4;

// GET /inventario
router.get("/", (req, res) => {
  res.send({ data: inventario });
});

// GET /inventario/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const item = inventario.find((item) => item.id == id);
  res.send({ data: item });
});

// POST /inventario
router.post("/", (req, res) => {
  const { nombre, precio } = req.body;

  if (nombre == null || precio == null) {
    return res.status(400).send({ error: "Faltan datos" });
  }
  if (isNaN(parseFloat(precio))) {
    return res
      .status(400)
      .send({ error: "El precio debe ser valor numéricos" });
  }
  if (parseFloat(precio) < 0) {
    return res.status(400).send({ error: "El precio no puede ser negativo" });
  }
  if (
    inventario.some(
      (item) => item.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    )
  ) {
    return res
      .status(400)
      .send({ error: "Este nombre ya está utilizado por otro elemento" });
  }

  const nuevoItem = {
    id: ++inventarioIdMax,
    nombre,
    precio,
    fecha: new Date(),
  };
  inventario.push(nuevoItem);
  res.status(201).send({ data: nuevoItem });
});

// PUT /inventario/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;

  if (nombre == null || precio == null) {
    return res.status(400).send({ error: "Faltan datos" });
  }
  if (isNaN(parseFloat(precio))) {
    return res
      .status(400)
      .send({ error: "El precio debe ser valor numéricos" });
  }
  if (parseFloat(precio) < 0) {
    return res.status(400).send({ error: "El precio no puede ser negativo" });
  }
  if (
    inventario.some(
      (item) =>
        item.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
        item.id !== id
    )
  ) {
    return res
      .status(400)
      .send({ error: "Este nombre ya está utilizado por otro elemento" });
  }

  const itemModificado = {
    id,
    nombre,
    precio,
    fecha: new Date(),
  };

  inventario = inventario.map((item) =>
    item.id === id ? itemModificado : item
  );

  res.status(200).send({ data: itemModificado });
});

// DELETE /inventario/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  inventario = inventario.filter((item) => item.id !== id);
  res.status(200).send({ id });
});

export default router;
