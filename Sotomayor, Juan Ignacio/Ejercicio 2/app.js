import express from "express"
import { calculosRouter } from "./calculos.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/calculos",calculosRouter)

app.listen(port,()=>{
    console.log("Iniciado")
})