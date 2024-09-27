import express from "express"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let calculos = [];

app.get('/calculos', (req, res) => {
    res.json(calculos);
});

app.post('/calculate', (req, res) => {
    const { ancho, alto } = req.body;
    const perimeter = 2 * (ancho + alto);
    const area = ancho * alto;
    const id = Date.now();
    const newCalculation = { id, ancho, alto, perimeter, area };
    calculos.push(newCalculation);
    res.json(newCalculation);
});

app.put('/calculos/:id', (req, res) => {
    const { id } = req.params;
    const { ancho, alto } = req.body;
    const index = calculos.findIndex(calc => calc.id === parseInt(id));
    if (index !== -1) {
        calculos[index] = {
            ...calculos[index],
            ancho,
            alto,
            perimeter: 2 * (ancho + alto),
            area: ancho * alto
        };
        res.json(calculos[index]);
    } else {
        res.status(404).json({ error: 'Calculo no encontrado' });
    }
});

app.delete('/calculos/:id', (req, res) => {
    const { id } = req.params;
    calculos = calculos.filter(calc => calc.id !== parseInt(id));
    res.json({ message: 'calculo borrado' });
});

app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`);
});