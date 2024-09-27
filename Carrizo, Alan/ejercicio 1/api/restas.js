import express from "express"

export const restasRouter = express.Router()

let restas = []

let restasMaxID = 0;

restasRouter.get("/",(req,res)=>{
    res.send({ restas })
})

restasRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const resta = restas.find((resta)=>resta.id == id);
    if (resta){
        res.send({ resta })
    }else{
        res.status(404).send({error: "Resta no encontrada."})
    }
})

restasRouter.post("/",(req,res)=>{
    const {a, b} = req.body
    const data = {id: ++restasMaxID, a, b, resultado: a - b, fecha: new Date()}
    restas.push(data)
    res.status(201).send({ data })
})

restasRouter.delete('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    restas = restas.filter((resta)=>resta.id !== id);
    res.status(200).send(restas)
})

restasRouter.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {a,b} = req.body;
    const resta = restas.find((resta)=>resta.id == id)
    resta.a = a;
    resta.b = b;
    resta.resultado = a-b;
    res.status(200).send({resta})
})
// Hacer de resta y multiplicación; si no se encuentra el id solicitado responder con un status 404