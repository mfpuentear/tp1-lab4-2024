import express from "express";

const Superficie = express.Router();

const Calculos = [];

// GET: Obtener todos los cálculos
Superficie.get("/", (req, res) => {
    res.send({ Calculos });
});

Superficie.post("/", (req, res) => {
    const { A, B } = req.body;

    if (typeof A !== 'number' || typeof B !== 'number') {
        return res.status(400).send({ error: 'A y B deben ser números' });
    }

    const NuevoId = Calculos.length > 0 ? Calculos[Calculos.length - 1].id + 1 : 1;
    
    const Resultado = A * B
    
    const NuevaSuperficie = { id: NuevoId, A, B, Resultado };
    Calculos.push(NuevaSuperficie); 

    res.status(201).send(NuevaSuperficie);
});

export default Superficie; 
