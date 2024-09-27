import express from "express"
import cors from "cors"
import { verduleriaRouter } from "./verduleria.js"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(("/verduleria"), verduleriaRouter)

app.listen(port, () => {
  console.log(`La aplicación está funcionando en el puerto: ${port}`)
})