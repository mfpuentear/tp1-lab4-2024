import express from 'express'
import tareasRoute from "./tareas.js"

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

app.use("/tareas", tareasRoute)

app.listen(port, () => {
    console.log(`La app esta esuchando el puerto ${port}`)
})