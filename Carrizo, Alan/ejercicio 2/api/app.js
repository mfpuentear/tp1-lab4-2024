import express from "express"
import cors from "cors"
import { perimetroRouter } from "./perimetro.js"
import { areaRouter } from "./area.js"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(("/perimetro"), perimetroRouter)
app.use(("/area"), areaRouter)

app.listen(port, () => {
  console.log(`La aplicación está funcionando en el puerto: ${port}`)
})