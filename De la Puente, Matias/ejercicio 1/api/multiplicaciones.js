import express from "express";

const MultiplicacionesRouter = express.Router();

let multiplicaciones = [];
let MultiplicacionesMaxId = 0;

MultiplicacionesRouter.get("/", (req, res) => {
    res.send({ multiplicaciones });
});


MultiplicacionesRouter.get("/:id", (req, res) => {
    
    const id = req.params.id;

    const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);

    res.send({ multiplicacion });
});


MultiplicacionesRouter.post("/", (req, res) => {
    const { a, b } = req.body;
    const multiplicacion = { id: ++MultiplicacionesMaxId, a, b, resultado: a * b, fecha: new Date() };
    multiplicaciones.push(multiplicacion);
    res.status(201).send({ multiplicacion });
});


MultiplicacionesRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;

    const multiplicacionModificada = { id, a, b, resultado: a + b, fecha: new Date() };
    
    multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion));
    res.status(200).send({ multiplicacion: multiplicacionModificada });
});


MultiplicacionesRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    multiplicaciones = multiplicaciones.filter((multiplicacion) => multiplicacion.id !== id);
    res.status(200).send({ id });
});

export default MultiplicacionesRouter;