import express from "express"
import { sumasRouter } from "./sumas.js"
import { divisionesRouter } from "./divisiones.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/sumas", sumasRouter)
app.use("/divisiones", divisionesRouter)

app.listen(port, () => {
  console.log(`La aplicación está funcionando en el puerto: ${port}`)
})