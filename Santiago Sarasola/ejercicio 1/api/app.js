import express from 'express';
import cors from 'cors';
import { sumasRouter } from './sumas.js';
import { restasRouter } from './restas.js';
import { divisionesRouter } from './divisiones.js';
import { multiplicacionesRouter } from './multiplicaciones.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/sumas", sumasRouter);
app.use("/restas", restasRouter);
app.use("/divisiones", divisionesRouter);
app.use("/multiplicaciones", multiplicacionesRouter);

app.listen(port, () => {
    console.log(`Aplicacion funcionando en puerto: ${port}`);
});