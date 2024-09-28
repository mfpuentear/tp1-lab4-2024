const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())


let listado = []

app.get("/productos", (req, res) => {
  res.json(listado)
})

app.post("/productos", (req, res) => {
  let { prod, precio } = req.body

  if (precio < 0) {
    return res.status(400).json({
      message: 'El precio no debe ser un numero negativo'
    })
  }


  const productoExiste = listado.find(producto => producto[0] == prod)
  if (productoExiste) {
    return res.status(400).json({
      message: 'Ya existe un producto con ese nombre'
    })
  }


  listado.push([prod, precio])
  res.json(listado)
})

app.put("/productos/:index", (req, res) => {
  const { index } = req.params
  const { prod, precio } = req.body

  if (precio < 0) {
    return res.status(400).json({
      message: 'El precio debe ser un numero positivo'
    })
  }

  const productoExiste = listado.find(producto => producto[0] == prod)
  if (productoExiste) {
    return res.status(400).json({
      message: 'Ya existe producto con ese nombre'
    })
  }

  if (index < 0 || index >= listado.length) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    })
  }

  listado[index] = [prod, precio]

  res.json(listado)
})

app.delete("/productos/:index", (req, res) => {
  const { index } = req.params

  listado.splice(index, 1)

  res.json(listado)
})


const PORT = 7777
app.listen(PORT, () => {
  console.log(`Servidor en: http://localhost:${PORT}`)
})