import express from "express";

const router = express.Router();

let alumnos = [
    { id: 0, nombre: "Ramon", nota1: 6, nota2: 8, nota3: 10,},];
let alumnosMaxId = 0;

router.get("/", (req, res) => {
    res.send({ alumnos });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const alum = alumnos.find((alum) => alum.id == id);
    res.send({ alum });
});

router.post("/", (req, res) => {
    const { nombre, nota1, nota2, nota3 } = req.body;
    const existe = alumnos.some((alum) => alum.nombre === nombre);
    if (existe) {
        return res.status(400).send({ mensaje: "No se puede agregar el mismo nombre" });
    }
    if (nota1 <= 0 || nota1 > 10 || nota2 <= 0 || nota2 > 10 || nota3 <= 0 || nota3 > 10 ) {
        return res.status(400).send({ mensaje: "La nota debe ser de 1 a 10" });
    }
    const alum = { id: ++alumnosMaxId,nombre: nombre, nota1: nota1,nota2: nota2,nota3: nota3, fecha: new Date() };
    alumnos.push(alum);
        res.status(201).send({ alum });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, nota1, nota2, nota3 } = req.body;
    if (nota1 <= 0 || nota1 > 10 || nota2 <= 0 || nota2 > 10 || nota3 <= 0 || nota3 > 10 ) {
        return res.status(400).send({ mensaje: "La nota debe ser de 1 a 10" });
    }

    const alumModificada = { id, nombre, nota1, nota2, nota3, fecha: new Date() };

    alumnos = alumnos.map((alum) => (alum.id === id ? alumModificada : alum));
        res.status(200).send({ alum: alumModificada });
});


router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    alumnos = alumnos.filter((alum) => alum.id !== id);
        res.status(200).send({ id });
});

export default router;