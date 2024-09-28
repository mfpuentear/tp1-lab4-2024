import express from "express";
import cors from "cors"
import verdurasRouter from "./verduras.js"

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hola")
})

app.use("/verduras",verdurasRouter)



app.listen(port, ()=>{
  console.log("Escuchando en el puerto 3000")
})