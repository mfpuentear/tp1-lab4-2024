import express from "express"

export const  verduleriaRouter = express.Router()

let listado = []
let listadoMaxId = 0

verduleriaRouter.get("/", (req, res) => {
    res.send({ listado })
})

verduleriaRouter.get("/:id", (req, res) => {
    const id = req.params.id
    const producto = listado.find((producto) => producto.id == id)
    res.send({ producto })
})

verduleriaRouter.post("/", (req, res) => {
    const { nombre, precio } = req.body
    const producto = {
        id: ++listadoMaxId,
        nombre,
        precio
    }

    if (listado.some(producto => producto.nombre === nombre)) {
        res.status(400).json({ mensaje: "El producto ya se encuentra en el listado. "})
    } else if (precio < 0) {
        res.status(400).json({ mensaje: "El precio del producto debe ser positivo. "})
    } else {
        listado.push(producto)
        res.status(201).send({ producto })
    }
})

verduleriaRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, precio } = req.body
    const productoModificado = {
        id,
        nombre,
        precio
    }
    listado = listado.map((producto) => 
        producto.id === id ? productoModificado : producto
    )
    res.status(200).send({ producto: productoModificado })
})

verduleriaRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    listado = listado.filter((producto) => producto.id !== id)
    res.status(200).send({ id })
})