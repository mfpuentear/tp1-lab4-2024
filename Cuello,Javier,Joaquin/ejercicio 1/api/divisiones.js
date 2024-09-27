import express from "express";

const DivisionesRouter = express.Router();

const divisiones = [
    { id: 1, A: 2, B: 5, Resultado: 0 },
    { id: 2, A: 6, B: 81, Resultado: 0 },
    { id: 5, A: 12, B: 55, Resultado: 0 },
];

let Idcontador = divisiones.length > 0 ? divisiones[divisiones.length - 1].id : 0;

DivisionesRouter.get("/", (req, res) => {
    divisiones.forEach((numero) => {
        numero.Resultado = numero.A / numero.B;
    });
    res.send({ divisiones });
});

DivisionesRouter.post("/", (req, res) => {
    const { A , B } = req.body;

    if (B === 0) {
        return res.status(400).send({ mensaje: 'No se puede dividir por cero' });
    }

    const Resultado = A / B
    const nuevaDivision = { id: ++Idcontador, A , B, Resultado: Resultado};

    divisiones.push(nuevaDivision);

    res.status(201).send(nuevaDivision);
});

export default DivisionesRouter;
