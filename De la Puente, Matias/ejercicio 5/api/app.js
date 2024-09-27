import express from "express"
import cors from "cors"

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

let tareas = [];

app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const { nombre, completada } = req.body;

    if (tareas.some(tarea => tarea.nombre.toLowerCase() === nombre.toLowerCase())) {
        return res.status(400).json({ error: 'Ya existe una tarea con este nombre' });
    }

    const nuevaTarea = { id: Date.now(), nombre, completada: completada || false };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.put('/tareas/:id', (req, res) => {
    const { id } = req.params;
    const { completada } = req.body;

    const indice = tareas.findIndex(tarea => tarea.id === parseInt(id));
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tareas[indice] = { ...tareas[indice], completada };
    res.json(tareas[indice]);
});

app.delete('/tareas/:id', (req, res) => {
    const { id } = req.params;
    tareas = tareas.filter(tarea => tarea.id !== parseInt(id));
    res.status(204).send();
});

app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en : ${puerto}`);
});