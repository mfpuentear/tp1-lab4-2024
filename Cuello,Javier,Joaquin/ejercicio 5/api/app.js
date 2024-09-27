import express from 'express';
import cors from 'cors';
import tareasRouter from './tareas.js';  

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.use('/api/tareas', tareasRouter);

app.listen(port, () => {
  console.log(`La aplicacion esta funcionanando en el puerto:${port}`);
});
