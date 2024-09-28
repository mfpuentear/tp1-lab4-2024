import express from "express";

export const productosRouter = express.Router();

let productos = [];
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
  const { nombre, precio } = req.body;

  if (productos.some((producto) => producto.nombre === nombre)) {
    res.status(400).send({ mensaje: "El producto ya existe." });
  }
  if (precio < 0) {
    res.status(400).send({ mensaje: "no se puede negativos" });
  }

  const producto = {
    id: ++productosMaxId,
    nombre,
    precio,
    fecha: new Date(),
  };
  productos.push(producto);
  res.status(201).send({ producto });
});

// PUT /productos/:id
productosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;

  if (productos.some((producto) => producto.nombre === nombre)) {
    res.status(400).send({ mensaje: "El producto ya existe." });
    return;
  }
  if (precio < 0) {
    res.status(400).send({ mensaje: "numeros negativos no" });
    return;
  }

  const productoModificada = {
    nombre,
    precio,

    fecha: new Date(),
  };

  productos[id] = productoModificada;

  /*productos = productos.map((producto) =>
    producto.id == id ? productoModificada : producto
  );*/
  res.status(200).send(productos);
});
// DELETE /productos/:id
productosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((producto) => producto.id !== id);
  res.status(200).send({ id });
});
