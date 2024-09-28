import express from "express"

const alumnosRouter = express.Router()

let alumnos = []

alumnosRouter.get("/", (req, res) => {
    res.json(alumnos)
})

alumnosRouter.get("/:id", (req, res) => {
    const id = req.params
    const encontrarAlumno = alumnos.find((e) => e.id === parseInt(id))

    if (!encontrarAlumno) {
        res.status(404).send({Mensaje : "No se puede encontrar alumno."})
    }

    return res.json( encontrarAlumno )
})

alumnosRouter.post("/", (req, res) => {
    const {nombre, nota1, nota2, nota3} = req.body
    const comparar = alumnos.find((e) => e.alumnos === nombre)

    if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || comparar) {
        return res.status(404).send({mensaje: nota1 <= 0 || nota2 <= 0 || nota3 <= 0 ? "la nota debe ser mayor a 0" : "el nombre ya existe"})
    }

const nuevoId = alumnos.length > 0 ? alumnos[alumnos.length -1].id +1 : 1
const nuevoAlumno = { id: nuevoId, nombre, nota1, nota2, nota3 }

alumnos.push(nuevoAlumno)
return res.status(201).json( nuevoAlumno )
})

alumnosRouter.put("/:id", (req, res) => {
    const { id } = req.params
    const { nombre, nota1, nota2, nota3 } = req.body
    const exAlumno = alumnos.find((e) => e.id === parseInt(id))

    if (!exAlumno) {
        return res.status(404).send({ mensaje: "No se encontró al alumno" })
    }

    const comparar = alumnos.find((e) => e.nombre === nombre && e.id !== parseInt(id))

    if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0 || comparar) {
        return res.status(400).send({mensaje: nota1 <= 0 || nota2 <= 0 || nota3 <= 0 ? "la nota debe ser mayor a 0" : "el nombre ya existe"})
    }

    const actualizarAlumno = {
        id: parseInt(id),
        nombre,
        nota1,
        nota2,
        nota3,
        fecha: new Date()
    }

    alumnos = alumnos.map((e) => e.id === parseInt(id).id ? actualizarAlumno : e)

    return res.status(200).json(actualizarAlumno)
})

alumnosRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    alumnos = alumnos.filter((e) => e.id !== parseInt(id));

    return res.status(202).send({ id });
})

export default alumnosRouter













