import express from "express"
import cors from "cors"
import SumasRouter from "./sumas.js"
import DivisionesRouter from "./divisiones.js"
import RestasRouter from "./resta.js"
import MultiplicacionRouter from "./multiplicacion.js"

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())

app.get("/",(req,res)=> {
    res.send("Hola primer ejercicio")
})

app.use("/sumas" , SumasRouter)

app.use("/divisiones" ,DivisionesRouter)

app.use("/restas" , RestasRouter)

app.use("/multiplicacion", MultiplicacionRouter)

app.listen(port , ()=> {
    console.log(`La aplicacion esta funcionando en: ${port}`)
})