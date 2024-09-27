import express from 'express'
import tareasRoute from "./tareas.js"
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hola Mundo")
})

app.use("/tareas", tareasRoute)

app.listen(port, () => {
    console.log(`La app esta funcionando en el puerto: ${port}`)
})