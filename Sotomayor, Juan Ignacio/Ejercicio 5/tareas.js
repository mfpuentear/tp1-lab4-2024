import express from "express"

export const tareasRouter= express.Router()

let lista = []
let idTarea=0

tareasRouter.get("/",(req,res)=>{
    res.send(lista)
})

tareasRouter.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const tarea = lista.find((item)=item.id===id)
    res.send(tarea)
})

tareasRouter.post("/",(req,res)=>{
    const {nombre,estado}=req.body

    if (lista.find((item)=>item.nombre==nombre)){
        return res.send("No se pueden repetir las tareas")
    }

    if (nombre!="" && estado!=""){
        const tarea = {id:++idTarea,nombre,estado}
        lista.push(tarea)
        res.send(tarea)
    }
})

tareasRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    if (lista.find((item)=>item.id==id)){
        lista = lista.filter((item)=>item.id!==id)
        res.send("Tarea eliminada")
    }
    else{
        res.send("Tarea no encontrada")
    }
})

tareasRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {nombre,estado}=req.body

    if (lista.find((item)=>item.id==id)){
        if (!lista.find((item)=>item.nombre==nombre && item.id!==id)){
            const tareaModificada = {id,nombre,estado}
            lista = lista.map((item)=>item.id==id ? tareaModificada : item)
            res.send(tareaModificada)
        }
        else{
            res.send("La tarea ya existe")
        }
    }
    else{
        res.send("Tarea no encontrada")
    }
})