import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

// Interpretar JSON en el body
app.use(express.json())

// Habilitamos CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
});


let tareas = [];

// Obtener todo
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Agregar 
app.post('/tareas', (req, res) => {
  const { nombre, completada } = req.body;

  // Se verifica que no exista otra tarea con el mismo nombre
  const tareaExistente = tareas.find(t => t.nombre.toLowerCase() === nombre.toLowerCase());
  if (tareaExistente) {
    return res.status(400).json({ error: 'La tarea ya existe' });
  }

  const nuevaTarea = { id: tareas.length + 1, nombre, completada: completada || false };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Modificar
app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { completada } = req.body;

  const tarea = tareas.find(t => t.id === parseInt(id));
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tarea.completada = completada;
  res.json(tarea);
});

// Eliminar 
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter(t => t.id !== parseInt(id));
  res.status(204).send();
});



app.listen(port, () => {
    console.log(`La aplicación está funcionando en el puerto ${port}`)
});
