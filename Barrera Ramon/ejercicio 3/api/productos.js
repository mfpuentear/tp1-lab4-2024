import express from "express";

const router = express.Router();

let productos = [
  { id: 0, producto: "cebolla", precio: 2000},
  // { id: 2, producto: 6, precio: 81, resultado: 87 },
  // { id: 5, producto: 12, precio: 55, resultado: 87 },
];
let productosMaxId = 0;

// GET /productos
router.get("/", (req, res) => {
  res.send({ productos });
});

// GET /productos/:id
router.get("/:id", (req, res) => {
  // Obtendo id de la ruta
  const id = req.params.id;

  // Busco la produc con id de la ruta
  const produc = productos.find((produc) => produc.id == id);

  // Devuelvo la produc encontrada
  res.send({ produc });
});

// POST /productos
router.post("/", (req, res) => {
  const { producto, precio } = req.body;
  const existe = productos.some((produc) => produc.producto === producto);
  if (existe) {
    return res.status(400).send({ mensaje: "No se puede agregar el mismo producto" });
  }
  if (precio <= 0) {
    return res.status(400).send({ mensaje: "El precio debe ser positivo" });
  }
  const produc = { id: ++productosMaxId, producto, precio, fecha: new Date() };
  productos.push(produc);
  res.status(201).send({ produc });
});

// PUT /productos/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { producto, precio } = req.body;

  const producModificada = { id, producto, precio, fecha: new Date() };

  productos = productos.map((produc) => (produc.id === id ? producModificada : produc));
  res.status(200).send({ produc: producModificada });
});

// DELETE /productos/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((produc) => produc.id !== id);
  res.status(200).send({ id });
});

export default router;