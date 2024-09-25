import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let currentId = 1;

let alumnos = [
    { id: 0, nombre: 'Mateo', nota1: 2, nota2: 10, nota3: 8, promedio: 6.67, condicion: "Aprobado" }
];

// Obtener alumnos
app.get("/alumnos", (req, res) => {
    res.json({ alumnos });
});

// Agregar un nuevo alumno
app.post("/alumnos", (req, res) => {
    const { nombre, nota1, nota2, nota3 } = req.body;

    if (alumnos.some(alumno => alumno.nombre === nombre)) {
        return res.status(400).json({ error: "Alumno ya existente en la lista" });
    }

    if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0) {
        return res.status(400).json({ error: 'Las notas deben ser mayores a 0' });
    }

    let promedio = (nota1 + nota2 + nota3) / 3;

    let condicion;
    if (promedio >= 8) {
        condicion = "Promocionado";
    } else if (promedio >= 6) {
        condicion = "Aprobado";
    } else {
        condicion = "Reprobado";
    }

    const nuevoAlumno = { id: currentId++, nombre, nota1, nota2, nota3, promedio, condicion };
    alumnos.push(nuevoAlumno);
    res.status(201).json({ mensaje: `Se agregó el alumno exitosamente`, alumno: nuevoAlumno });
});

app.delete("/alumnos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    alumnos = alumnos.filter((alumno) => alumno.id !== id);
    res.status(200).json({ mensaje: `Alumno con ID ${id} eliminado`, id });
});

app.put("/alumnos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, nota1, nota2, nota3 } = req.body;

    const alumno = alumnos.find(alumno => alumno.id === id);

    if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    if (alumnos.some(alumno => alumno.nombre === nombre && alumno.id !== id)) {
        return res.status(400).json({ error: 'Ya existe un alumno con ese nombre' });
    }

    if (nota1 <= 0 || nota2 <= 0 || nota3 <= 0) {
        return res.status(400).json({ error: 'Las notas deben ser mayores a 0' });
    }

    alumno.nombre = nombre;
    alumno.nota1 = nota1;
    alumno.nota2 = nota2;
    alumno.nota3 = nota3;
    alumno.promedio = (nota1 + nota2 + nota3) / 3;
    if (alumno.promedio >= 8) {
        alumno.condicion = "Promocionado";
    } else if (alumno.promedio >= 6) {
        alumno.condicion = "Aprobado";
    } else {
        alumno.condicion = "Reprobado";
    }

    res.status(200).json({ mensaje: `Alumno con ID ${id} actualizado`, alumno });
});

app.listen(port, () => {
    console.log(`La aplicación está funcionando en: http://localhost:${port}`);
});
