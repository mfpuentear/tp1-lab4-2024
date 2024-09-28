import express from 'express';
import cors from 'cors';
import { productosRouter } from './productos.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/productos", productosRouter);

app.listen(port, () => {
    console.log(`Aplicacion funcionando en puerto: ${port}`)
});