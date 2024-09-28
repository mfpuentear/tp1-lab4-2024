import express from "express"

const router = express.Router()
let productos = []
let id = 0

router.get("/", (req, res) => {
  res.send(productos)
})

router.post("/", (req, res) => {
  const { nombre, precio } = req.body

  if (productos.some((p) => p.nombre === nombre)) {
    res
      .status(200)
      .json({ error: `Ya existe un producto con el mismo nombre` })
    return
  }

  if (precio < 0) {
    res.status(200).json({ error: `El precio no puede ser negativo` })
    return
  }

  const nuevoProducto = {
    id,
    nombre,
    precio,
  }

  productos.push(nuevoProducto)
  res.send(nuevoProducto).status(201)
  id++
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { nombre, precio } = req.body

  const producto = productos.find((p) => p.id === id)
  if (!producto) {
    res.status(404).json({ error: "Producto no encontrado" })
  }

  if (productos.some((p) => p.nombre === nombre && p.id !== id)) {
    res
      .status(400)
      .json({ error: `Ya existe un producto con el nombre ${nombre}` })
    return
  }

  if (precio < 0) {
    res.status(400).json({ error: `El precio no puede ser negativo` })
    return
  }

  producto.nombre = nombre
  producto.precio = precio

  productos = productos.map((p) => (p.id === id ? producto : p))

  res.json(producto)
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)

  const producto = productos.find((p) => p.id === id)
  if (!producto) {
    res.status(404).json({ error: "Producto no encontrado" })
  }

  productos = productos.filter((p) => p.id !== id)
  res.json({ mensaje: "Producto eliminado" }).status(410)
})

export default router
