import express from "express"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let productos = [];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;

    if (productos.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) {
        return res.status(400).json({ error: 'Este producto ya existe' });
    }

    if (precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser positivo' });
    }

    const newProduct = { id: Date.now(), nombre, precio };
    productos.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (productos.some(p => p.id !== parseInt(id) && p.nombre.toLowerCase() === nombre.toLowerCase())) {
        return res.status(400).json({ error: 'Este producto ya existe' });
    }

    if (precio <= 0) {
        return res.status(400).json({ error: 'el precio debe ser positivo' });
    }

    productos[index] = { ...productos[index], nombre, precio };
    res.json(productos[index]);
});

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(p => p.id !== parseInt(id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server corriendo en el puerto :${port}`);
});