import express from "express";

const router = express.Router();

let productos = [
  { id: 1, producto: "tomates", precio: 1800 },
];

let productosMaxId = 0;

// GET todos los productos
router.get("/", (req, res) => {
  res.send({ productos });
});

// GET productos por id 
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const produc = productos.find((produc) => produc.id == id);
  res.send({ produc });
});

// POST crear productos
router.post("/", (req, res) => {
  const { producto, precio } = req.body;

  // Verifica que el producto no esté repetido
  const existe = productos.some((produc) => produc.producto === producto);
  if (existe) {
    return res.status(400).send({ mensaje: "No se puede agregar el mismo producto" });
  }

  // Verifica que el precio sea positivo
  if (precio <= 0) {
    return res.status(400).send({ mensaje: "El precio debe ser positivo" });
  }

  // Agrega el nuevo producto
  const produc = { id: ++productosMaxId, producto, precio, fecha: new Date() };
  productos.push(produc);
  res.status(201).send({ produc });
});

// PUT Modifica producto por id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { producto, precio } = req.body;

  // Verifica precio positivo
  if (precio <= 0) {
    return res.status(400).send({ mensaje: "El precio debe ser positivo" });
  }

  // Verifica que el nombe de producto no esté repetido
  const existe = productos.some((produc) => produc.producto === producto && produc.id !== id);
  if (existe) {
    return res.status(400).send({ mensaje: "No se puede modificar a un nombre repetido" });
  }

  // Modifica el producto
  const producModificada = { id, producto, precio, fecha: new Date() };
  productos = productos.map((produc) => (produc.id === id ? producModificada : produc));
  res.status(200).send({ produc: producModificada });
});

// DELETE Elimina un producto por ID.
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((produc) => produc.id !== id);
  res.status(200).send({ id });
});

export default router;
