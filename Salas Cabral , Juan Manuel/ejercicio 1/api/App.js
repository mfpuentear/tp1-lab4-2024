import express from "express"
import cors from "cors"
import routerSuma from "./suma.js"
import routerResta from "./resta.js"
import routerDivision from "./division.js"
import routerMultiplicacion from "./multiplicacion.js"



const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hola Mundo")})

app.use("/api/suma", routerSuma)

app.use("/api/resta",routerResta)

app.use("/api/disivion",routerDivision)

app.use("/api/multiplicacion",routerMultiplicacion)

app.listen(port,()=> {
    console.log(`La app esta corriendo en ${port}`)})





