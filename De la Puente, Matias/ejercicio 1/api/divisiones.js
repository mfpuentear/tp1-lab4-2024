import express from "express"

export const divisionesRouter = express.Router();

let divisiones = []

let divisionesMaxID = 0

divisionesRouter.get("/",(req,res)=>{
    res.send({ divisiones })
})

divisionesRouter.post("/", (req,res)=>{
    const {a,b} = req.body
    if(b>a || b==0){
        res.status(400).send("No se puede dividir por 0 o el divisor es mayor al dividendo")
        return
    }
    const division = {
        id: ++divisionesMaxID,
        a,
        b,
        resultado: (a/b).toFixed(2)
    }
    divisiones.push(division)
    res.status(201).send({ divisiones })
})

divisionesRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const division = divisiones.find((division)=>division.id == id);
    if (!division){
        res.status(404).send({error: "División no encontrada."})
    }
    res.send({ division })    
})

divisionesRouter.delete('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    divisiones = divisiones.filter((division)=>division.id !== id);
    if(!divisiones){
        res.status(404).send({ error: "División no encontrada." })
    }
    res.status(200).send(divisiones)
})

divisionesRouter.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {a,b} = req.body;
    const division = divisiones.find((division)=>division.id == id)
    if (!division) {
        return res.status(404).send({ error: "División no encontrada." });
    }
    division.a = a;
    division.b = b;
    division.resultado = a+b;
    res.status(200).send( {division} )
})