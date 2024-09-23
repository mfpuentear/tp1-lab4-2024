import express from "express"

export const divisionesRouter = express.Router();

const divisiones = []

let divisionesMaxID = 0

divisionesRouter.get("/",(req,res)=>{
    res.send({data: divisiones})
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
        resultado: a/b
    }
    divisiones.push(division)
    res.status(201).send({divisiones})
})