import express from 'express'
import cors from "cors"

const app = express()
const port = 3000

//interpretar JSON en body
app.use(express.json())

//Habilitamos CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
})

let calculos = [];

// Obtener todos
app.get('/calculos', (req, res) => {
    res.json(calculos);
});

// Crear calculo
app.post('/calculos', (req, res) => {
    const { base, altura } = req.body;
    if (base && altura) {
        const perimetro = 2 * (base + altura);
        const superficie = base * altura;
        const nuevoCalculo = { id: calculos.length + 1, base, altura, perimetro, superficie };
        calculos.push(nuevoCalculo);
        res.status(201).json(nuevoCalculo);
    } else {
        res.status(400).json({ message: 'Faltan datos' });
    }
});

// Modificar
app.put('/calculos/:id', (req, res) => {
    const { id } = req.params;
    const { base, altura } = req.body;
    const index = calculos.findIndex((calc) => calc.id === parseInt(id));
    if (index !== -1) {
        const perimetro = 2 * (base + altura);
        const superficie = base * altura;
        calculos[index] = { id: parseInt(id), base, altura, perimetro, superficie };
        res.json(calculos[index]);
    } else {
        res.status(404).json({ message: 'Error' });
    }
});

// Eliminar
app.delete('/calculos/:id', (req, res) => {
    const { id } = req.params;
    const index = calculos.findIndex((calc) => calc.id === parseInt(id));
    if (index !== -1) {
        calculos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Error' });
    }
});

app.listen(port, () => {
    console.log(`La aplicacion esta funcionando en el puerto ${port}`)
})