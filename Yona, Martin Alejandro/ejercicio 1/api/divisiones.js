import express from 'express';

export const divisionesRoute = express.Router();

let divisiones = [];

// GET /divisiones
divisionesRoute.get('/', (req, res) => {
    return res.send({ data: divisiones });
});

// GET /divisiones/:id
divisionesRoute.get('/:id', (req, res) => {
    const { id } = req.params;
    const division = divisiones.find(division => division.id == id);
    return res.send({ data: division });
});

// POST /divisiones
divisionesRoute.post('/', (req, res) => {
    const { a, b } = req.body;
    if (b === 0) {
        return res.status(400).json({ mensaje: "No se puede dividir por 0" });
    }
    const id = divisiones.length > 0 ? divisiones[divisiones.length - 1].id + 1 : 1;
    const nuevaDivision = { id, a, b, resultado: a / b };
    divisiones.push(nuevaDivision);
    return res.status(201).json({ data: nuevaDivision });
});

// DELETE /divisiones/:id
divisionesRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    divisiones = divisiones.filter(division => division.id != id);
    return res.status(202).json({ id });
});

// PUT /divisiones/:id
divisionesRoute.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { a, b } = req.body;
    if (b === 0) {
        return res.status(400).json({ mensaje: "No se puede dividir por 0" });
    }
    const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() };
    divisiones = divisiones.map(division => division.id == id ? divisionModificada : division);
    return res.status(201).json({ data: divisionModificada });
});
