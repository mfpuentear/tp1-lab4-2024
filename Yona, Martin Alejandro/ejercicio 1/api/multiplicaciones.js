import express from 'express';

export const multiplicacionesRoute = express.Router();

let multiplicaciones = [];

// GET /multiplicaciones
multiplicacionesRoute.get('/', (req, res) => {
    return res.json({ data: multiplicaciones });
});

// GET /multiplicaciones/:id
multiplicacionesRoute.get('/:id', (req, res) => {
    const { id } = req.params;
    const multiplicacion = multiplicaciones.find(m => m.id == id);
    return res.json({ data: multiplicacion });
});

// POST /multiplicaciones
multiplicacionesRoute.post('/', (req, res) => {
    const { a, b } = req.body;
    if (b === 0) {
        return res.status(400).json({ mensaje: "La multiplicación por 0 no está permitida" });
    }
    const id = multiplicaciones.length ? multiplicaciones[multiplicaciones.length - 1].id + 1 : 1;
    const nuevaMultiplicacion = { id, a, b, resultado: a * b };
    multiplicaciones.push(nuevaMultiplicacion);
    return res.status(201).json({ data: nuevaMultiplicacion });
});

// DELETE /multiplicaciones/:id
multiplicacionesRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    multiplicaciones = multiplicaciones.filter(m => m.id != id);
    return res.status(202).json({ id });
});

// PUT /multiplicaciones/:id
multiplicacionesRoute.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { a, b } = req.body;
    const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() };
    multiplicaciones = multiplicaciones.map(m => m.id == id ? multiplicacionModificada : m);
    return res.status(201).json({ data: multiplicacionModificada });
});
