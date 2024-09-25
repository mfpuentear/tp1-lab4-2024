import express from "express"

const MultiplicacionRouter = express.Router()

let multiplicaciones = [
    {id : 1 , A : 2 , B : 3 , Resultado : 0},
    {id : 4 , A : 6 , B : 36 , Resultado : 0},
    {id : 1 , A : 211 , B : 312 , Resultado : 0}
]

let IdContador = multiplicaciones.length > 0 ? multiplicaciones[multiplicaciones.length - 1].id : 0

MultiplicacionRouter.get("/",(req , res)=> {
    multiplicaciones.forEach((numero)=> {
        numero.Resultado = numero.A * numero.B
    })
    res.send({ multiplicaciones })
})

MultiplicacionRouter.post("/",(req,res)=> {
    const {A , B } = req.body

    if(typeof A !== 'number' || typeof B !== 'number'){
        return res.status(400).send({error : 'A y B deben ser numeros'})
    }

    const Resultado = A * B
    const NuevaMultiplicacion = {id : ++IdContador, A , B , Resultado : Resultado}
    multiplicaciones.push(NuevaMultiplicacion)

    res.status(201).send(NuevaMultiplicacion)

})










export default MultiplicacionRouter