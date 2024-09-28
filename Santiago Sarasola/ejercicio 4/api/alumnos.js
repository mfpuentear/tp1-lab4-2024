import express, { Router } from 'express';
export const alumnosRouter = express.Router();

let alumnos = [];
let alumnosMaxId = 0;

//GET Alumnos
alumnosRouter.get("/", (req,res) => {
    res.status(200).send({alumnos});
});

//GET Alumno especifico
alumnosRouter.get("/:id", (req,res) => {
    const id = req.params.id;
    const alumno = alumnos.find((alumno) => alumno.id == id);    
    if(!alumno){
        res.status(400).send({mensaje:"Alumno no encontrado!"});
    }else{
        res.status(200).send({alumno});
    }
});

//POST Alumno
alumnosRouter.post("/", (req, res) => {
        const nombre = req.body.nombre;
        const nota1 = req.body.nota1;
        const nota2 = req.body.nota2;
        const nota3 = req.body.nota3;
        const alumnoConMismoNombre = alumnos.find((alumno) => alumno.nombre.toLowerCase() == nombre.toLowerCase());  
        if(alumnoConMismoNombre){
            res.status(400).send({mensaje:"Ya hay un alumno existente con el mismo nombre!"});
        }else if(nota1<0 || nota2<0 || nota3<0){
            res.status(400).send({mensaje:"Todas las notas ingresadas deben ser positivas!"});
        }
        else{
            const nuevoAlumno = {id: ++alumnosMaxId, nombre: nombre, nota1: nota1, nota2: nota2, nota3: nota3, fecha: new Date()};
            alumnos.push(nuevoAlumno);
            res.status(201).send({nuevoAlumno});
        }
});

//PUT /alumnos/:id 
alumnosRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const nota1 = req.body.nota1;
    const nota2 = req.body.nota2;
    const nota3 = req.body.nota3;
    const alumnoExistente = alumnos.find((alumno) => alumno.id == id);
    if(!alumnoExistente){
        res.status(400).send({mensaje:"Alumno no encontrado!"});
    }else if(nota1<0 || nota2<0 || nota3<0){
        res.status(400).send({mensaje:"Todas las notas ingresadas deben ser positivas!"});
    }else{
        const alumnoConMismoNombre = alumnos.find((alumno) => alumno.nombre.toLowerCase() == nombre.toLowerCase() && alumno.id != id);  
        if(alumnoConMismoNombre){
            res.status(400).send({mensaje:"Ya hay un alumno existente con el mismo nombre!"});
        }else{
            const alumnoModificado = {id: parseInt(id), nombre: nombre, nota1: nota1, nota2: nota2, nota3: nota3, fecha: new Date()};
            alumnos = alumnos.map((alumno) => (alumno.id == id ?  alumnoModificado : alumno));
            res.status(201).send({alumnoModificado});
        }
    }
});

//DELETE Alumno
alumnosRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const alumno = alumnos.find((alumno) => alumno.id == id);
    if(!alumno){
        res.status(400).send({mensaje:"Alumno no encontrado"});
    }else{
        alumnos = alumnos.filter((alumno) => alumno.id != parseInt(id));
        res.status(200).send({ id });
    }
})