import express from 'express'
import cors from 'cors';
import { tareasRouter } from "./tareas.js"

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.use("/tareas", tareasRouter)

app.listen(port, () => {
    console.log(`La app esta funcionando en ${port}`)
})