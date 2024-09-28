import express from "express";
import cors from "cors"
import tareasRouter from "./tareas.js"

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hola")
})

app.use("/tareas",tareasRouter)



app.listen(port, ()=>{
  console.log("Escuchando en el puerto 3000")
})