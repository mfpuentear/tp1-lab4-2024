import express from 'express'
import { rectanguloRoute } from './rectangulos.js';
import cors from 'cors';

const app = express();
const port = 3000;

//interpretar json en body
app.use(express.json())

//habilitar cors
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use('/rectangulos',rectanguloRoute)
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`)
})

