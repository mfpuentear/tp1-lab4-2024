import express from "express"

const RestasRouter = express.Router()

let restas = [
    {id : 1 , A : 2 , B : 3 , Resultado : 0},
    {id : 4 , A : 6 , B : 36 , Resultado : 0},
    {id : 1 , A : 211 , B : 312 , Resultado : 0}
]


RestasRouter.get("/",(req,res)=>{
    restas.forEach((resta)=>{
        resta.Resultado = resta.A - resta.B
    })

    res.send({mensaje : "Resta de A - B"  , restas })
})

RestasRouter.post("/",(req,res)=>{
    const {A , B } = req.body

    if(typeof A !== 'number' || typeof B !== 'number'){
        return res.status(400).send({error : 'A y B deben ser numeros'})
    }

    const NuevoId = restas.length > 0 ? restas[restas.length -1].id : 1
    const Resultado = A - B
    const NuevaResta = {id : NuevoId , A , B , Resultado : Resultado}
    restas.push(NuevaResta)
    
    res.status(201).send(NuevaResta)
})

export default RestasRouter