import express from 'express';

export const sumasRoute = express.Router();

let sumas = [];

// GET /sumas
sumasRoute.get('/', (req, res) => {
    return res.send({ data: sumas });
});

// GET /sumas/:id
sumasRoute.get('/:id', (req, res) => {
    const { id } = req.params;
    const suma = sumas.find(s => s.id == id);
    return res.send({ data: suma });
});

// POST /sumas
sumasRoute.post('/', (req, res) => {
    const id = sumas.length ? sumas[sumas.length - 1].id + 1 : 1;
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    const nuevaSuma = { id, a, b, resultado: a + b };
    sumas.push(nuevaSuma);
    return res.status(201).send({ data: nuevaSuma })
});

// DELETE /sumas/:id
sumasRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    sumas = sumas.filter(s => s.id != id);
    return res.status(200).send({ id })
});

// PUT /sumas/:id
sumasRoute.put('/:id', (req, res) => {
    const id = req.params.id;
    const { a, b } = req.body;
    
    const sumaModificada = {
        id,
        a: parseInt(a),
        b: parseInt(b),
        resultado: parseInt(a) + parseInt(b),
        fecha: new Date()
    };

    // Reemplazar la suma en el array usando map
    sumas = sumas.map(s => s.id == id ? sumaModificada : s);

    return res.status(200).send({ suma: sumaModificada });
});
