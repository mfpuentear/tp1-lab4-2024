import express from "express";

export const productosRoute = express.Router();

let productos = [
  { id: 1, nombre: "lavarropa", precio: 1000 },
  { id: 2, nombre: "cocina", precio: 21000 },
  { id: 3, nombre: "heladera", precio: 888000 },
];
let productosMaxid = 0;

// obtener todas los productos
productosRoute.get("/", (req, res) => {
  return res.json({ data: productos });
});

// obtener un producto por id
productosRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const productoEncontrado = productos.find((prod) => prod.id === parseInt(id));

  if (!productoEncontrado) {
    return res.status(404).send({ mensaje: "producto no encontrado" });
  }

  return res.json({ data: productoEncontrado });
});

// agregar un nuevo producto
productosRoute.post("/", (req, res) => {
  const { a, b } = req.body;
  const nuevoproducto = { id: ++productosMaxid, a, b, resultado: a + b };

  productos.push(nuevoproducto);
  return res.status(201).json({ data: nuevoproducto });
});

//  eliminar un producto por ID
productosRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  productos = productos.filter((prod) => prod.id !== parseInt(id));

  return res.status(202).send({ id });
});

// actualizar un producto existente
productosRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { a, b } = req.body;

  const productoActualizado = {
    id: id,
    a,
    b,
    resultado: a + b,
    fecha: new Date(),
  };

  productos = productos.map((prod) =>
    prod.id === productoActualizado.id ? productoActualizado : prod
  );

  return res.status(200).json({ data: productoActualizado });
});
