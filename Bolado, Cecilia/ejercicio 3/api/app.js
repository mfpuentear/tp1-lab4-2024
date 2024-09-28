import express from "express"
import cors from "cors"
import vegetalesRouter from "./verduleria.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hola mundo")
})

app.use("/vegetales", vegetalesRouter)

app.listen(port, () => {
  console.log(`La aplicacion esta funcionanando en el puerto ${port}`)
})