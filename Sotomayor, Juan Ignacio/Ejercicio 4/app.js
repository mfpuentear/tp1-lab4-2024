import express from "express"
import cors from "cors"
import { notasRouter } from "./notas.js"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/notas",notasRouter)

app.listen(port,()=>{
    console.log("Iniciado")
})