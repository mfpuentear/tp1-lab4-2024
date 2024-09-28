import express from 'express';
import cors from 'cors';
import { cuadradoRouter } from './cuadrados.js';
import { rectanguloRouter } from './rectangulos.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/cuadrados", cuadradoRouter);
app.use("/rectangulos", rectanguloRouter);

app.listen(port, () => {
    console.log(`Aplicacion funcionando en puerto: ${port}`)
});