import express from "express";
const router = express.Router();

let alumnos = []

let maxId = 0;

router.get("/", (req, res)=>{
    return res.status(200).send({alumnos});
})

router.get("/:id", (req, res) =>{
    const {id} = req.params;
    const alumno = alumnos.find((alumno) => alumno.id == id);
    if(alumno){
        return res.status(200).send({alumno});
    }else{
        return res.status(404).send({error: `No se encontro un alumno con el id ${id}`});
    }
})

router.post("/", (req, res) =>{
    const {nombre, nota1, nota2, nota3} = req.body;
    if(nota1 <= 0 || nota2 <= 0 || nota3 <= 0){
        return res.status(400).send({error: "Las notas deben ser unicamente positivas."});
    }
    const existe = alumnos.some((alumno) => alumno.nombre.toLowerCase() == nombre.toLowerCase());
    if(existe){
        return res.status(400).send({error: "No puede haber dos alumnos con el mismo nombre."});
    }
    const alumno = {id: ++maxId, nombre, nota1, nota2, nota3};
    alumnos.push(alumno);
    return res.status(201).send({alumno});
})

router.put("/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const {nombre, nota1, nota2, nota3} = req.body;
    if(nota1 <= 0 || nota2 <= 0 || nota3 <= 0){
        return res.status(400).send({error: "Las notas deben ser unicamente positivas."});
    }
    const existe = alumnos.some((alumno) => alumno.nombre.toLowerCase() == nombre.toLowerCase() && alumno.id !== id);
    if(existe){
        return res.status(400).send({error: "No puede haber dos alumnos con el mismo nombre."});
    }
    const alumnoModificado = {id, nombre, nota1, nota2, nota3};
    alumnos = alumnos.map((alumno) => alumno.id === id ? alumnoModificado : alumno);
    return res.status(200).send({alumno: alumnoModificado});
})

router.delete("/:id", (req, res) =>{
    const {id} = req.params.id;
    alumnos = alumnos.filter((alumno) => alumno.id != id);
    return res.status(200).send({id});
})

export default router;