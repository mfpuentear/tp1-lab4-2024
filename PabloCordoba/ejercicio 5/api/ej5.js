const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5300

app.use(express.json())
app.use(cors())

let tareas = []


app.get('/tareas', (req, res) => {
    res.json(tareas)
});


app.post('/tareas', (req, res) => {
    const {nombre} = req.body

    
    const tareaExistente = tareas.find(tarea => tarea.nombre === nombre)
    if (tareaExistente) {
        return res.status(400).json({ error: 'La tarea ya existe' })
    }

    const tareaNueva = { nombre, completada: false }
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
})


app.put('/tareas/:nombre', (req, res) => {
    const {nombre} = req.params
    const {completada} = req.body

 
    const tarea = tareas.find(tarea => tarea.nombre === nombre);
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.completada = completada;
    res.json(tarea);
});


app.delete('/tareas/:nombre', (req, res) => {
    const {nombre} = req.params;

  
    const nuevaLista = tareas.filter(tarea => tarea.nombre !== nombre);

    if (nuevaLista.length === tareas.length) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tareas = nuevaLista;
    res.status(204).send(); 
});

app.get('/resumen', (req, res) => {
    const total = tareas.length
    const completadas = tareas.filter(tarea => tarea.completada).length
    const noCompletadas = total - completadas

    res.json({ total, completadas, noCompletadas })
});


app.listen(PORT, console.log(`Servidor de tareas corriendo en http://localhost:${PORT}`)
);
