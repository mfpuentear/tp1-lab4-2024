import express from "express";

const Perimetro = express.Router();

const Calculos = [];

// GET: Obtener todos los cálculos
Perimetro.get("/", (req, res) => {
    res.send({ Calculos });
});

// POST: Crear un nuevo cálculo de perímetro
Perimetro.post("/", (req, res) => {
    const { A, B } = req.body;

    if (typeof A !== 'number' || typeof B !== 'number') {
        return res.status(400).send({ error: 'A y B deben ser números' });
    }
    const NuevoId = Calculos.length > 0 ? Calculos[Calculos.length - 1].id + 1 : 1;
    
    const Resultado = 2 * (A + B); 
    
    const NuevoPerimetro = { id: NuevoId, A, B, Resultado };
    Calculos.push(NuevoPerimetro); 

    res.status(201).send(NuevoPerimetro); 
});

export default Perimetro;
