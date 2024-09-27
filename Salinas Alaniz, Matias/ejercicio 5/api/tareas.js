import express from 'express'

export const tareasRouter = express.Router()

let tareas = [
    {id:1,nombre:"Estudiar",completada:true}
]

tareasRouter.get('/',(req, res)=>{
    res.status(200).send({data:tareas})
})

tareasRouter.post('/',(req,res)=>{
    const id = (tareas.length< 1) ? 1 : parseInt(tareas[tareas.length-1].id) + 1
    const { nombre, completada} = req.body
    const repetido = tareas.find((tarea)=> tarea.nombre == nombre)
    if (!repetido){
        const nuevaTarea = { id, nombre, completada}
        tareas.push(nuevaTarea)
        return res.status(201).send({data:nuevaTarea})
    }else{
        return res.status(400).send('Ya existe una tarea con ese nombre')
    }
})

tareasRouter.put('/:id', (req, res) =>{
    const { id } = req.params
    const { nombre, completada } = req.body
    
    const repetido = tareas.find((tarea)=>tarea.nombre == nombre && id != tarea.id)

    if(!repetido){
        const tareaModificada = { id, nombre, completada}
        tareas = tareas.map((tarea)=>(tarea.id == id) ? tareaModificada : tarea)
        return res.status(200).send({data:tareaModificada})
    }else{
        return res.status(400).send('Ya existe una tarea con nombre')
    }
})

tareasRouter.delete('/:id', (req, res)=>{
    const { id } = req.params
    tareas = tareas.filter((tarea)=>tarea.id != id)
    res.status(200).send('Tarea eliminada')
})



