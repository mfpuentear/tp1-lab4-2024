import express from 'express'
import alumnosRoute from "./alumnos.js"
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hola mundo!")
})

app.use("/alumnos", alumnosRoute)

app.listen(port, () => {
    console.log(`La aplicacion esta funcionando en: ${port}`)
})