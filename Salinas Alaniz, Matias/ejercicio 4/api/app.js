import express, { json } from "express"
import cors from "cors"
import { alumnosRouter } from "./alumnos.js"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/alumnos',alumnosRouter)

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto 3000.`)
})