import express from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

let Idcontador = 2

let tareas = []

app.get("/tareas",(req , res) => {
    res.json( { tareas })
})

app.post("/tareas", (req, res) => {
    const { nombre, completada } = req.body;

    if (tareas.some(tarea => tarea.nombre === nombre)) {
        return res.status(400).json('No se puede agregar tareas con el mismo nombre');
    }

    let estadoCompletada = completada;
    if (typeof completada === 'string') {
        estadoCompletada = completada.toLocaleLowerCase() === 'true';
    }

    const nuevaTarea = { id: Idcontador++, nombre, completada: estadoCompletada || false };
    tareas.push(nuevaTarea);

    res.status(201).json(nuevaTarea); 
});


app.put("/tareas/:id",(req,res)=> {
    const id = parseInt(req.params.id)
    const tarea = tareas.find(tarea => tarea.id === id)


    tarea.completada = !tarea.completada
    res.status(200).json(tarea);
})

app.delete("/tareas/:id",(req,res)=> {
    const id = parseInt(req.params.id)  
    tareas = tareas.filter(tarea => tarea.id !== id)
    res.status(200).json({ mensaje: `Tarea con ID ${id} eliminado`, id });

})


app.listen(port, () => {
    console.log(`La aplicación está funcionando en: ${port}`);
});