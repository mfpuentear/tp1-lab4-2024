import { Router } from "express";

let lista = [];
let tareaMaxID = 0;

export const listaRouter = Router();

listaRouter.get("/", (req,res)=>{
    res.send({ lista })
});

listaRouter.get("/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const data = lista.find((t)=>t.id == id)
    if(!data){
        res.status(404).send({ error: "Tarea no encontrada." })
    }
    res.status(200).send({ data })
})

listaRouter.post("/", (req,res)=>{
    const { tarea } = req.body;
    const data = { id: ++tareaMaxID, tarea: tarea, completada: false, fecha: new Date()};
    lista.push(data)
    res.status(200).send({ lista })
})

listaRouter.delete("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    lista = lista.filter((t)=>t.id !== id);
    res.status(200).send({ lista })
})

listaRouter.patch("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const { completada } = req.body;
    const data = lista.find((t)=> t.id == id)
    if (!data){
        res.status(404).send({ error: "Tarea no encontrada." })
    }
    data.completada = completada;
    res.send({ data })
})