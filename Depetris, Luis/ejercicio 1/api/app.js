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

app.use("/suma", sumaRouter)

app.use("/resta", restarRouter)

app.use("/multiplicacion", multiplicacionRouter)

app.use("/division", divisionRouter)

app.listen(port, () => {
  console.log(`App funcionando en el puerto ${port}`)
})
