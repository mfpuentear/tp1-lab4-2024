import express from "express"
import cors from "cors"
import routercalculos from "./calculos.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hola mundo!").status(201)})

app.use("/api/calculos/", routercalculos)

app.listen(port, () => {
  console.log(`La aplicacion esta funcionanando en el puerto ${port}`)})