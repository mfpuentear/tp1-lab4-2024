import express from 'express';
import cors from 'cors';
import { alumnosRouter } from './alumnos.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/alumnos", alumnosRouter);

app.listen(port, () => {
    console.log(`Aplicacion funcionando en puerto: ${port}`)
});