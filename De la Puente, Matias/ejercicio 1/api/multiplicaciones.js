import express from "express"

export const multiplicacionesRouter = express.Router()

let multiplicaciones = []

let multiplicacionesMaxID = 0;

multiplicacionesRouter.get("/",(req,res)=>{
    res.send({ multiplicaciones })
})

multiplicacionesRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const multiplicacion = multiplicaciones.find((multiplicacion)=>multiplicacion.id == id);
    if (multiplicacion){
        res.send({ multiplicacion })
    }else{
        res.status(404).send({error: "Multiplicación no encontrada."})
    }
})

multiplicacionesRouter.post("/",(req,res)=>{
    const {a, b} = req.body
    const data = {id: ++multiplicacionesMaxID, a, b, resultado: a * b, fecha: new Date()}
    multiplicaciones.push(data)
    res.status(201).send({data})
})

multiplicacionesRouter.delete('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    multiplicaciones = multiplicaciones.filter((multiplicacion)=>multiplicacion.id !== id);
    res.status(200).send(multiplicaciones)
})

multiplicacionesRouter.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {a,b} = req.body;
    const multiplicacion = multiplicaciones.find((multiplicacion)=>multiplicacion.id == id)
    multiplicacion.a = a;
    multiplicacion.b = b;
    multiplicacion.resultado = a*b;
    res.status(200).send({multiplicacion})
})
// Hacer de resta y multiplicación; si no se encuentra el id solicitado responder con un status 404