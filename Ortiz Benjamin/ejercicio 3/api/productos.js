import express from "express";

export const productosRouter = express.Router();

let productos = [];
let productoMaxId = 0;

productosRouter.get("/", (req, res) => {
  res.send({ productos });
});

productosRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((producto) => producto.id == id);
  res.send({ producto });
});

productosRouter.post("/", (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || precio === undefined || precio <= 0) {
    res.status(400).send({ mensaje: "campos invalidos" });
  }

  const productoExistente = productos.find(
    (producto) => producto.nombre === nombre
  );
  if (productoExistente) {
    return res.status(400).send({ mensaje: "El producto ya existe" });
  }

  const producto = {
    id: ++productoMaxId,
    nombre: nombre,
    precio: precio,
  };
  productos.push(producto);
  res.status(201).send({ producto });
});

productosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;
  if (!nombre || precio === undefined || precio <= 0)
    res.status(400).send({ mensaje: "campos invalidos" });

  const productoExistente = productos.find(
    (producto) => producto.nombre === nombre
  );
  if (productoExistente) {
    return res.status(400).send({ mensaje: "El producto ya existe" });
  }
  const productoModificado = {
    id: id,
    nombre,
    precio,
  };

  productos = productos.map((prod) =>
    prod.id === productoModificado.id ? productoModificado : prod
  );

  res.status(200).json({ producto: productoModificado });
});

productosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((producto) => producto.id !== id);
  res.status(200).send({ id });
});
