import express from "express"

export const alumnosRouter = express.Router()

let listado = []
let listadoMaxId = 0

alumnosRouter.get("/", (req, res) => {
    res.send({ listado })
})

alumnosRouter.post("/", (req, res) => {
    const { nombre, a, b, c } = req.body
    const alumno = {
        id: ++listadoMaxId,
        nombre,
        a,
        b,
        c,
        promedio: (a + b + c) / 3
    }

    if (listado.some(alumno => alumno.nombre === nombre)) {
        res.status(400).json({ mensaje: "El alumno ya se encuentra en el listado." })
    } else if (a < 0 || b < 0 || c < 0) {
        res.status(400).json({ mensaje: "Todas las notas deben ser positivas." })
    } else {
        listado.push(alumno)
        res.status(201).send({ alumno })
    }
})

alumnosRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, a, b, c } = req.body
    const alumnoModificado = {
      id,
      nombre,
      a,
      b,
      c,
      promedio: (a + b + c) / 3
    }
    listado = listado.map((alumno) =>
      alumno.id === id ? alumnoModificado : alumno
    )
    res.status(200).send({ alumno: alumnoModificado })
  })

alumnosRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    listado = listado.filter(alumno => alumno.id !== id)
    res.status(200).send({ id })
})