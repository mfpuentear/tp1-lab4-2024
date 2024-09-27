import express from "express";
const router = express.Router();

let tareas = []

let maxId = 0;

router.get("/", (req, res) =>{
    return res.status(200).send({tareas});
})

router.get("/:id", (req, res) =>{
    const {id} = req.params;
    const tarea = tareas.find((tarea) => tarea.id == id);
    if(tarea){
        return res.status(200).send({tarea});
    }else{
        return res.status(400).send({error: `No se encontro la tarea con el id ${id}`});
    }
})

router.post("/", (req, res) =>{
    const {nombre, completado} = req.body;
    const existe = tareas.some((tarea) => tarea.nombre.toLowerCase() === nombre.toLowerCase());
    if(existe){
        return res.status(400).send({error: "Ya existe una tarea con ese nombre."});
    }
    const tarea = {id: ++maxId, nombre, completado};
    tareas.push(tarea);
    return res.status(201).send({tarea});
})

router.put("/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const {nombre, completado} = req.body;
    const existe = tareas.some((tarea) => tarea.nombre.toLowerCase() === nombre.toLowerCase() && tarea.id !== id);
    if(existe){
        return res.status(400).send({error: "Ya existe una tarea con ese nombre."});
    }
    const tareaModificada = {id, nombre, completado};
    tareas = tareas.map((tarea) => tarea.id === id ? tareaModificada : tarea);
    return res.status(200).send({tarea: tareaModificada});
})

router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    tareas = tareas.filter((tarea) => tarea.id != id);
    return res.status(200).send({id});
})



export default router;