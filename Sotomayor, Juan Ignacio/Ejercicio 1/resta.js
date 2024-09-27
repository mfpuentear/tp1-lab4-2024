import express from "express"

export const RestaRouter = express.Router()

let listaRestas = []

let restaId=0

RestaRouter.get("/",(req,res)=>{
    res.send({listaRestas})
})

RestaRouter.get("/:id",(req,res)=>{
    const id = req.params.id
    const resta = listaRestas.find((resta)=> resta.id==id)
})

RestaRouter.post("/",(req,res)=>{
    const {a,b}= req.body
    const resta = {id:++restaId, a, b, resultado: a-b}
    listaRestas.push(resta)
    res.send(resta)
})

RestaRouter.delete("/:id",(req,res)=>{
    const {id} = req.params
    listaRestas = listaRestas.filter((resta)=>resta.id != id)
    res.status(200).send("Elemento eliminado")
})

RestaRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {a,b}= req.body
    const restaModificada = {id, a, b, resultado:a-b}

    listaRestas = listaRestas.map((resta)=>(resta.id === id ? restaModificada : resta))
    res.status(200).send({restaModificada})
})