import  express, { response }  from  "express"

const divisionesRouter = express.Router()

let divisiones = [
    // { id: 1, a: 2, b: 5, resultado: 7 },
    // { id: 2, a: 6, b: 81, resultado: 87 },
    // { id: 5, a: 12, b: 55, resultado: 87 },
]

let divisionesMaxId = 0

//Acción GET/divisiones
divisionesRouter.get("/", (req, res) => {
    res.send({divisiones})
})

//Acción GET/divisiones/:id
divisionesRouter.get("/:id", (req, res) => {
    const id = req.params.id
    const division = divisiones.find((division) => division.id == id)
    res.send({ data : division })
})

//Acción POST /divisiones/:id
divisionesRouter.post("/", (req,res) => {
        const { a, b} = req.body
        const division = { id: ++divisionesMaxId, a, b, resultado : a / b, fecha: new Date()}
        divisiones.push(division)
        res.status(201).send( division )
})

//Acción PUT/divisiones/:id
divisionesRouter.put("/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const { a, b } = req.body
    if (b === 0) {
        res.status(400).send({ mensaje: "No se puede dividir por 0." });
        return;
    }
    const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date()}
    divisiones = divisiones.map((division) => (division.id === id? divisionModificada : division ))
    res.status(200).send({ suma : divisionModificada })
})

//Acción DELETE/divisiones/:id
divisionesRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    divisiones = divisiones.filter((division) => division.id !== id)
    res.status(200).send ({ data : id })
})

export default divisionesRouter