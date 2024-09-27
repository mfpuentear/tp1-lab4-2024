import express from 'express';
import cors from 'cors';
import { tareasRouter } from './tareas.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use("/tareas", tareasRouter);
app.use(cors());

app.listen(port, () => {
    console.log(`Aplicacion funcionando en puerto: ${port}`)
});