import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

// Interpretar JSON en el body
app.use(express.json())

// Habilitamos CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
});



let productos = [];

// Obtener todo
app.get('/productos', (req, res) => {
    res.json(productos)
});

// Agregar 
app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body

    // Verificar que el nombre no esté repetido y que el precio sea positivo
    const productoExistente = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    if (productoExistente) {
        return res.status(400).json({ error: 'El producto ya existe' })
    }
    if (precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser positivo' })
    }

    const nuevoProducto = { id: productos.length + 1, nombre, precio }
    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
});

// Modificar 
app.put('/productos/:id', (req, res) => {
    const { id } = req.params
    const { nombre, precio } = req.body
    const producto = productos.find(p => p.id === parseInt(id))

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    if (precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser positivo' })
    }

    const productoDuplicado = productos.find(
        p => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== producto.id
    );
    if (productoDuplicado) {
        return res.status(400).json({ error: 'Otro producto con el mismo nombre ya existe' })
    }

    producto.nombre = nombre
    producto.precio = precio

    res.json(producto)
});

// Eliminar 
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params
    productos = productos.filter(p => p.id !== parseInt(id))
    res.status(204).send()
})



app.listen(port, () => {
    console.log(`La aplicación está funcionando en el puerto ${port}`)
});
