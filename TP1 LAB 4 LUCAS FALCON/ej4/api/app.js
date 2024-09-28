import express from "express";
import cors from "cors"
import alumnosRouter from "./alumnos.js"

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hola")
})

app.use("/alumnos", alumnosRouter)


app.listen(port, ()=>{
  console.log("Escuchando en el puerto 3000")
})