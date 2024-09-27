import express, { Router } from 'express';
export const tareasRouter = express.Router();

let tareas = [];
let tareasMaxId = 0;

//GET Tareas
tareasRouter.get("/", (req,res) => {
    res.status(200).send({tareas});
});

//GET Tarea especifico
tareasRouter.get("/:id", (req,res) => {
    const id = req.params.id;
    const tarea = tareas.find((tarea) => tarea.id == id);    
    if(!tarea){
        res.status(400).send({mensaje:"Tarea no encontrada!"});
    }else{
        res.status(200).send({tarea});
    }
});

//POST Tarea
tareasRouter.post("/", (req, res) => {
        const nombre = req.body.nombre;
        const completada = req.body.completada;
        const tareaConMismoNombre = tareas.find((tarea) => tarea.nombre.toLowerCase() == nombre.toLowerCase());  
        if(tareaConMismoNombre){
            res.status(400).send({mensaje:"Ya hay una tarea existente con el mismo nombre!"});
        }
        else{
            const nuevaTarea = {id: ++tareasMaxId, nombre: nombre, completada: completada, fecha: new Date()};
            tareas.push(nuevaTarea);
            res.status(201).send({nuevaTarea});
        }
});

//PUT /tareas/:id 
tareasRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const completada = req.body.completada;
    const tareaExistente = tareas.find((tarea) => tarea.id == id);
    if(!tareaExistente){
        res.status(400).send({mensaje:"Tarea no encontrada!"});
    }else{
        const tareaConMismoNombre = tareas.find((tarea) => tarea.nombre.toLowerCase() == nombre.toLowerCase());  
        if(tareaConMismoNombre){
            res.status(400).send({mensaje:"Ya hay una tarea existente con el mismo nombre!"});
        }else{
            const tareaModificada = {id: parseInt(id), nombre: nombre, completada: completada, fecha: new Date()};
            tareas = tareas.map((tarea) => (tarea.id == id ?  tareaModificada : tarea));
            res.status(201).send({tareaModificada});
        }
    }
});

//DELETE Tarea
tareasRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const tarea = tareas.find((tarea) => tarea.id == id);
    if(!tarea){
        res.status(400).send({mensaje:"Tarea no encontrada"});
    }else{
        tareas = tareas.filter((tarea) => tarea.id != parseInt(id));
        res.status(200).send({ id });
    }
})