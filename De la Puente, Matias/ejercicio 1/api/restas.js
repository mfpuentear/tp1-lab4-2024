import express from "express";

const RestaRouter = express.Router();

let restas = [];
let restasMaxId = 0;

// GET /restas
RestaRouter.get("/", (req, res) => {
    res.send({ restas });
});

// GET /restas/:id
RestaRouter.get("/:id", (req, res) => {
    // Obtendo id de la ruta
    const id = req.params.id;

    // Busco la suma con id de la ruta
    const restas = restas.find((resta) => resta.id == id);

    // Devuelvo la suma encontrada
    res.send({ suma });
});

// POST /restas
RestaRouter.post("/", (req, res) => {
    const { a, b } = req.body;
    const resta = { id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date() };
    restas.push(resta);
    res.status(201).send({ resta });
});

// PUT /restas/:id
RestaRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;

    const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
    // con map
    restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
    res.status(200).send({ resta: restaModificada });
});

// DELETE /restas/:id
RestaRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    restas = restas.filter((resta) => resta.id !== id);
    res.status(200).send({ id });
});

export default RestaRouter;