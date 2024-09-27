import express from "express";

export const productos = express.Router();

let listaProductos = [];
let id = 0;

productos.get("/listaProductos", (req, res) => {
  res.send(listaProductos);
});

productos.post("/listaProductos", (req, res) => {
  const { nombreProducto, precio } = req.body;

  if (
    nombreProducto.trim().length === 0 ||
    typeof nombreProducto != "string" ||
    typeof precio != "number" ||
    isNaN(precio) ||
    precio <= 0
  ) {
    res.status(400).send("Verifique los datos enviados");
  } else {
    const productoDuplicado = listaProductos.find(
      (producto) =>
        producto.nombreProducto.toLowerCase() === nombreProducto.toLowerCase()
    );

    if (productoDuplicado) {
      res
        .status(400)
        .send(`El producto ${nombreProducto} ya existe en la lista`);
    } else {
      const producto = {
        id: id++,
        nombreProducto: nombreProducto,
        precio: precio,
      };

      listaProductos.push(producto);

      res.status(201).send({ producto });
    }
  }
});

productos.delete("/listaProductos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listaProductos = listaProductos.filter((item) => item.id !== id);
  res.status(200).send({ id });
});

productos.put("/listaProductos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombreProducto, precio } = req.body;

  const producto = listaProductos.find((item) => item.id === id);

  if (
    nombreProducto.trim().length === 0 ||
    typeof nombreProducto != "string" ||
    typeof precio != "number" ||
    isNaN(precio) ||
    precio <= 0
  ) {
    res.status(400).send("Datos incorrectos o no encontrados");
  } else {

    
    const productoDuplicado = listaProductos.find(
      (producto) =>
        producto.nombreProducto.toLowerCase() === nombreProducto.toLowerCase()
    );

    if (productoDuplicado) {
      res
        .status(400)
        .send(`El producto que está modificando ya existe en la lista`);
    } else {
      producto.nombreProducto = nombreProducto;
      producto.precio = precio;
      res.status(200).send({ producto });
    }
  }
});
