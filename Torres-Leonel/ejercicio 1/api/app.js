import express from "express";
import sumasRouter from "./sumas.js"
import divisionesRouter from "./divisiones.js"
import restasRouter from "./restas.js"
import multiplicacionesRouter from "./multiplicaciones.js"
import cors from "cors"

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())



app.use('/sumas',sumasRouter)
app.use('/divisiones',divisionesRouter)
app.use('/restas',restasRouter)
app.use('/multiplicaciones',multiplicacionesRouter)





app.listen(port, ()=>{
  console.log("Escuchando en el puerto 3000")
})