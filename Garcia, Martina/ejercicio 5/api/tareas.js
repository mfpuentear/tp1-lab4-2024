import express from "express"

export const tareasRouter = express.Router()

let listado = []
let listadoMaxId = 0

tareasRouter.get("/", (req, res) => {
    res.send({ listado })
})

tareasRouter.post("/", (req, res) => {
    const { nombre, status } = req.body
    const tarea = {
        id: ++listadoMaxId,
        nombre,
        status
    }

    if (listado.some(tarea => tarea.nombre === nombre)) {
        res.status(400).json({ mensaje: "La tarea ya se encuentra en el listado." })
    } else {
        listado.push(tarea)
        res.status(201).send({ tarea })
    }
})

tareasRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, status } = req.body
    const tareaModificada = {
        id,
        nombre,
        status
      }
      listado = listado.map((tarea) =>
        tarea.id === id ? tareaModificada : tarea
      )
      res.status(200).send({ tarea: tareaModificada })
    })

tareasRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    listado = listado.filter(tarea => tarea.id !== id)
    res.status(200).send({ id })
})