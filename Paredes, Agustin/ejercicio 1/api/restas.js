import  express  from  "express"

const restasRouter = express.Router()

let restas = [
    // { id: 1, a: 2, b: 5, resultado: 7 },
    // { id: 2, a: 6, b: 81, resultado: 87 },
    // { id: 5, a: 12, b: 55, resultado: 87 },
]

let restasMaxId = 0

//Acción GET/restas
restasRouter.get("/", (req, res) => {
    res.send({restas})
})

//Acción GET/restas/:id
restasRouter.get("/:id", (req, res) => {
    const id = req.params.id
    const resta = restas.find((resta) => resta.id == id)
    res.send({ data : resta })
})

//Acción POST /restas/:id
restasRouter.post("/", (req,res) => {
    const { a, b} = req.body
    const resta = { id: ++restasMaxId, a, b, resultado : a - b, fecha: new Date()}
    restas.push(resta)
    res.status(201).send( resta )
})

//Acción PUT/restas/:id
restasRouter.put("/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const { a, b } = req.body
    const restaModificada = { id, a, b, resultado: a - b, fecha: new Date()}
    restas = restas.map((resta) => (resta.id === id? restaModificada : resta ))
    res.status(200).send({ suma : restaModificada })
})

//Acción DELETE/restas/:id
restasRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    restas = restas.filter((resta) => resta.id !== id)
    res.status(200).send ({ id })
})

export default restasRouter