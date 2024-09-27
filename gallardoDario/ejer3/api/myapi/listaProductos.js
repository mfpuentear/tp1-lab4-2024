import express from "express";

export const productosRouter = express.Router();

let productos = [
  { id: 6, FrutVerd: "banada", precioPorKg: 2100, cantidadKg: 1 },
];
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
  const { precioPorKg, cantidadKg } = req.body;

  if (precioPorKg < 0 || cantidadKg < 0) {
    res.status(400).send({ mensaje: "no se puede negativos" });
    return;
  }

  const producto = {
    id: ++productosMaxId,
    FrutVerd: "banada",
    precioPorKg: 2100,
    cantidadKg: 1,
    resultado: precioPorKg * cantidadKg,
    fecha: new Date(),
  };
  productos.push(producto);
  res.status(201).send({ producto });
});

// PUT /productos/:id
productosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { precioPorKg, cantidadKg } = req.body;

  const productoModificada = {
    id,
    FrutVerd,
    precioPorKg,
    cantidadKg,
    resultado: precioPorKg * cantidadKg,
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
