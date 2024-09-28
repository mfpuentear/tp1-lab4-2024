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
    res.send({ error: `El producto se ${nombre}, ya existe` })
    return
  }
  if (precio < 0) {
    res.send({ error: `No puede ser negativo` })
    return
  }
  const productonuevo = {id,nombre,precio,}
  productos.push(productonuevo)
  res.send(productonuevo).status(201)
  id++
})
router.put("/:id", (req, res) => {
  const id = parseInt(req.parametros.id)
  const { nombre, precio } = req.body
  const producto = productos.find((p) => p.id === id)
  if (!producto) {res.status(404).send({ error: "El producto no se encuentra" })}
  if (productos.some((p) => p.nombre === nombre && p.id !== id)) {res.send({ error: `Ya existe un producto con el nombre ${nombre}` })
    return
  }
  if (precio < 0) {
    res.send({ error: `El precio no puede ser negativo` })
    return
  }
  producto.nombre = nombre
  producto.precio = precio
  productos = productos.map((p) => (p.id === id ? producto : p))
  res.json(producto)
})
router.delete("/:id", (req, res) => {
  const id = parseInt(req.parametros.id)
  const producto = productos.find((p) => p.id === id)
  if (!producto) {res.status(404).send({ error: "No se encuentra el producto" })}
  productos = productos.filter((p) => p.id !== id)
  res.send().status(410)
})
export default router
