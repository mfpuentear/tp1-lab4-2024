import express from "express"

export const sumasRouter = express.Router()

let sumas = []

let sumasMaxID = 0;

sumasRouter.get("/",(req,res)=>{
    res.send({sumas})
})

sumasRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const suma = sumas.find((suma)=>suma.id == id);
    if (suma){
        res.send({ sumas })
    }else{
        res.status(404).send({error: "Suma no encontrada."})
    }
})

sumasRouter.post("/",(req,res)=>{
    const {a, b} = req.body
    const data = {id: ++sumasMaxID, a, b, resultado: a + b, fecha: new Date()}
    sumas.push(data)
    res.status(201).send({data})
})

sumasRouter.delete('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    sumas = sumas.filter((suma)=>suma.id !== id);
    res.status(200).send(sumas)
})

sumasRouter.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {a,b} = req.body;
    const suma = sumas.find((suma)=>suma.id == id)
    suma.a = a;
    suma.b = b;
    suma.resultado = a+b;
    res.status(200).send({suma})
})
// Hacer de resta y multiplicación; si no se encuentra el id solicitado responder con un status 404