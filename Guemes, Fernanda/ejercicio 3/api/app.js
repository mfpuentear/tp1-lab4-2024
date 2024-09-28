import express from "express"
import cors from "cors"
import productosRouter from "./productos.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use("/productos/", productosRouter)

app.listen(port, () => {
  console.log(`App funcionando en el puerto ${port}`)
})