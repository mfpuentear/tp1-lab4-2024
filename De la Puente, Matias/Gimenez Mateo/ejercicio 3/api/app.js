import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let currentId = 1;  // Mover la declaración de currentId aquí

let productos = [];

// Obtener productos
app.get("/productos", (req, res) => {
  res.json({ productos });
});

// Agregar un nuevo producto
app.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;

  if (productos.some(producto => producto.nombre === nombre)) {
    return res.status(400).json({ error: "Producto ya existente en la lista" });
  }

  if (precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
  }

  const nuevoProducto = { id: currentId++, nombre, precio };
  productos.push(nuevoProducto);
  res.status(201).json({ mensaje: `Se agregó el producto exitosamente`, producto: nuevoProducto });
});

// Eliminar un producto por ID
app.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const productoIndex = productos.findIndex((producto) => producto.id === id);

  if (productoIndex === -1) {
    return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
  }

  productos = productos.filter((producto) => producto.id !== id);
  res.status(200).json({ mensaje: `Producto con ID ${id} eliminado`, id });
});

// Modificar un producto por ID
app.put("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body; // Mantén los nombres consistentes

  const producto = productos.find(producto => producto.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  if (productos.some(producto => producto.nombre === nombre && producto.id !== id)) {
    return res.status(400).json({ error: 'Ya existe un producto con ese nombre' });
  }

  if (precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
  }

  producto.nombre = nombre;
  producto.precio = precio;

  res.status(200).json({ mensaje: `Producto con ID ${id} actualizado`, producto });
});

app.listen(port, () => {
  console.log(`La aplicación está funcionando en: http://localhost:${port}`);
});
