import express from "express";

export const productosRouter = express.Router();

let productos = [{ id: 6, nombre: "banada", precio: 2100, cantidad: 1 }];
let productosMaxId = 0;

productosRouter.get("/", (req, res) => {
  res.send({ productos });
});

productosRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  const producto = productos.find((producto) => producto.id == id);

  res.send({ producto });
});

productosRouter.post("/", (req, res) => {
  const { nombre, precio, cantidad } = req.body;

  if (productos.some((producto) => producto.nombre === nombre)) {
    res.status(400).send({ mensaje: "El producto ya existe." });
  }
  if (precio < 0 || cantidad < 0) {
    res.status(400).send({ mensaje: "no se puede negativos" });
  }

  const total = precio * cantidad;
  const producto = {
    id: ++productosMaxId,
    nombre,
    precio,
    cantidad,
    total,
    fecha: new Date(),
  };
  productos.push(producto);
  res.status(201).send({ producto });
});

// PUT /productos/:id
productosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { precio, cantidad } = req.body;

  if (productos.some((producto) => producto.nombre === nombre)) {
    res.status(400).send({ mensaje: "El producto ya existe." });
    return;
  }
  if (precio < 0 || cantidad < 0) {
    res.status(400).send({ mensaje: "numeros negativos no" });
    return;
  }
  const total = precio * cantidad;

  const productoModificada = {
    id,
    nombre,
    precio,
    cantidad,
    total,
    fecha: new Date(),
  };
  productos = productos.map((producto) =>
    producto.id === id ? productoModificada : producto
  );
  res.status(200).send({ producto: productoModificada });
});
// DELETE /productos/:id
productosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((producto) => producto.id !== id);
  res.status(200).send({ id });
});
