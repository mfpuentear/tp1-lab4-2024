import  express  from  "express"

const multiplicacionesRouter = express.Router()

let multiplicaciones = [
    // { id: 1, a: 2, b: 5, resultado: 7 },
    // { id: 2, a: 6, b: 81, resultado: 87 },
    // { id: 5, a: 12, b: 55, resultado: 87 },
]

let multiplicacionesMaxId = 0

//Acción GET/multiplicaciones
multiplicacionesRouter.get("/", (req, res) => {
    res.send({multiplicaciones})
})

//Acción GET/multiplicaciones/:id
multiplicacionesRouter.get("/:id", (req, res) => {
    const id = req.params.id
    const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id)
    res.send({ data : multiplicacion })
})

//Acción POST /multiplicaciones/:id
multiplicacionesRouter.post("/", (req,res) => {
    const { a, b} = req.body
    const multiplicacion = { id: ++multiplicacionesMaxId, a, b, resultado : a * b, fecha: new Date()}
    multiplicaciones.push(multiplicacion)
    res.status(201).send( multiplicacion )
})

//Acción PUT/multiplicaciones/:id
multiplicacionesRouter.put("/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const { a, b } = req.body
    const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date()}
    multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id? multiplicacionModificada : multiplicacion))
    res.status(200).send({ multiplicacion : multiplicacionModificada })
})

//Acción DELETE/multiplicaciones/:id
multiplicacionesRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    multiplicaciones = multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id)
    res.status(200).send ({ id })
})

export default multiplicacionesRouter