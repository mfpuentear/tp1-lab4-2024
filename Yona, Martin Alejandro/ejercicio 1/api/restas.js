import express from 'express';

export const restasRoute = express.Router();

let restas = [];

// GET /restas
restasRoute.get('/', (req, res) => {
    return res.send({ data: restas });
});

// GET /restas/:id
restasRoute.get('/:id', (req, res) => {
    const { id } = req.params;
    const resta = restas.find(r => r.id == id);
    return res.send({ data: resta });
});

// POST /restas
restasRoute.post('/', (req, res) => {
    const { a, b } = req.body;
    if (b === 0) {
        return res.status(400).send({ mensaje: "No se permite la resta por 0" });
    }
    const id = restas.length > 0 ? restas[restas.length - 1].id + 1 : 1;
    const nuevaResta = { id, a, b, resultado: a - b };
    restas.push(nuevaResta);
    return res.status(201).send({ data: nuevaResta });
});

// DELETE /restas/:id
restasRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    restas = restas.filter(r => r.id != id);
    return res.status(202).send({ id });
});

// PUT /restas/:id
restasRoute.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() };
    restas = restas.map(r => r.id == id ? restaModificada : r);
    return res.status(201).send({ data: restaModificada });
});
