import express from "express"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let alumnos = [];

app.get('/alumnos', (req, res) => {
    res.json(alumnos);
});

app.post('/alumnos', (req, res) => {
    const { nombre, notas } = req.body;

    if (alumnos.some(s => s.nombre.toLowerCase() === nombre.toLowerCase())) {
        return res.status(400).json({ error: 'el alumno con este nombre ya existe' });
    }

    if (!Array.isArray(notas) || notas.length !== 3 || notas.some(grade => grade < 0 || grade > 10)) {
        return res.status(400).json({ error: 'notas invalidas' });
    }

    const newStudent = { id: Date.now(), nombre, notas };
    alumnos.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, notas } = req.body;

    const index = alumnos.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'estudiante no encontrado' });
    }

    if (alumnos.some(s => s.id !== parseInt(id) && s.nombre.toLowerCase() === nombre.toLowerCase())) {
        return res.status(400).json({ error: 'el alumno con este nombre ya existe' });
    }

    if (!Array.isArray(notas) || notas.length !== 3 || notas.some(grade => grade < 0 || grade > 10)) {
        return res.status(400).json({ error: 'notas invalidas' });
    }

    alumnos[index] = { ...alumnos[index], nombre, notas };
    res.json(alumnos[index]);
});

app.delete('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    alumnos = alumnos.filter(s => s.id !== parseInt(id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server corriendo en el puerto: ${port}`);
});