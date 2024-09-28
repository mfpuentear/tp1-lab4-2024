import express from 'express'
import cors from "cors"
import sumasRouter from "./sumas.js";
import restasRouter from "./restas.js";
import divisionesRouter from "./divisiones.js";
import multiplicacionesRouter from "./multiplicaciones.js";

const app = express()
const port = 3000

//interpretar JSON en body
app.use(express.json())

//Habilitamos CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
})

app.use("/sumas", sumasRouter)
app.use("/divisiones", divisionesRouter)
app.use("/restas", restasRouter)
app.use("/multiplicaciones", multiplicacionesRouter)


app.listen(port, () => {
    console.log(`La aplicacion esta funcionando en el puerto ${port}`)
})