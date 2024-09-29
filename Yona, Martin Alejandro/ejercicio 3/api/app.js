import express from 'express'
import cors from 'cors'
import { productosRouter } from './productos.js';

const app = express();
const PORT = 3000;

app.use(express.json())

app.use(cors())

app.get('/', (req , res) =>{
    res.send('Hola mundo')
})
app.use('/productos',productosRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})