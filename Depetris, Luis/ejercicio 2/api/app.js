import express from "express"
import cors from "cors"
import calculosRouter from "./calculos.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use("/calculos", calculosRouter)

app.listen(port, () => {
  console.log(`App funcionando en el puerto ${port}`)
})