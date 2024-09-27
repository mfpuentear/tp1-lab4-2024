import express from "express"

const router = express.Router()

let sumas = [
    {id : 1 , A : 2 , B : 3 , Resultado : 0},
    {id : 4 , A : 6 , B : 36 , Resultado : 0},
    {id : 2 , A : 211 , B : 312 , Resultado : 0}
]

router.get("/", (req , res) =>{
    res.send({ sumas });
})

router.get("/sumar", (req , res) =>{
    sumas.forEach((suma)=> {
        suma.Resultado = suma.A + suma.B
    })
    res.send({ sumas });
})

// con un Post
router.post("/",(req , res)=>{
    const {A , B} = req.body;

    if(typeof A !== 'number' || typeof B !== 'number'){
        return res.status(400).send({error : 'A y B deben ser numeros'})
    }

    const NuevoId = sumas.length > 0 ? sumas[sumas.length - 1].id + 1 : 1 
    const Resultado = A + B

    const NuevaSuma = {id : NuevoId , A , B , Resultado : Resultado}
    sumas.push(NuevaSuma)

    res.status(201).send(NuevaSuma)
})






export default router