import express from "express";

export const productosRoute = express.Router();

let productos = [];
let productosMaxid = 0;

productosRoute.get("/", (req, res) => {
  return res.json({ data: productos });
});

productosRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const productoEncontrado = productos.find((prod) => prod.id === parseInt(id));

  if (!productoEncontrado) {
    return res.status(404).send({ mensaje: "producto no encontrado" });
  }

  return res.json({ data: productoEncontrado });
});

productosRoute.post("/", (req, res) => {
  const { nombre, precio } = req.body;
  const nombrecomp = productos.find((prod) => prod.nombre === nombre);

  if (precio <= 0 || nombrecomp) {
    return res.status(400).send({
      mensaje:
        precio <= 0 ? "el precio debe ser mayor a 0" : "el producto ya existe",
    });
  }

  const nuevoproducto = { id: ++productosMaxid, nombre, precio };
  productos.push(nuevoproducto);

  return res.status(201).json({ data: nuevoproducto });
});

productosRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  productos = productos.filter((prod) => prod.id !== parseInt(id));

  return res.status(202).send({ id });
});

productosRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const nombrecomp = productos.find((prod) => prod.nombre === nombre);

  if (precio <= 0 || nombrecomp) {
    return res.status(400).send({
      mensaje:
        precio <= 0 ? "el precio debe ser mayor a 0" : "el producto ya existe",
    });
  }

  const productoActualizado = {
    id: id,
    nombre,
    precio,
    fecha: new Date(),
  };

  productos = productos.map((prod) =>
    prod.id === productoActualizado.id ? productoActualizado : prod
  );

  return res.status(200).json({ data: productoActualizado });
});