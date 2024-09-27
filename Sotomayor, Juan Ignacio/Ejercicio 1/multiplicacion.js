import express from "express"

export const multRouter = express.Router()

let listaMult = []
let multId = 0

multRouter.get("/",(req,res)=>{
    res.send({listaMult})
})

multRouter.get("/:id",(req,res)=>{
    const id = req.params.id
    const mult = listaMult.find((mult)=>mult.id==id)
    res.send({mult})
})

multRouter.post("/",(req,res)=>{
    const {a,b}=req.body

    const mult = {id: ++multId, a, b, resultado: a*b}

    listaMult.push(mult)
    res.status(201).send(mult)
})

multRouter.delete("/:id",(req,res)=>{
    const id = req.params.id
    listaMult = listaMult.filter((mult)=>mult.id !=id)
    res.send("Elemento eliminado")
})

multRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {a,b} = req.body

    const multModificada = {id,a,b,resultado:a*b}

    listaMult = listaMult.map((mult)=>(mult.id===id ? multModificada : mult))
    res.status(200).send({multModificada})
})