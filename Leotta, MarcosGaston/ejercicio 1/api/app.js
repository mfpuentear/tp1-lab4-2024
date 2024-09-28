import express from "express"
import sumaRouter from "./suma.js"
import restarRouter from "./resta.js"
import multiplicacionRouter from "./multiplicacion.js"
import divisionRouter from "./division.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hola mundo")
})

app.use("/api/suma", sumaRouter)

app.use("/api/resta", restarRouter)

app.use("/api/multiplicacion", multiplicacionRouter)

app.use("/api/division", divisionRouter)

app.listen(port, () => {
  console.log(`La aplicacion esta funcionanando en el puerto ${port}`)
})