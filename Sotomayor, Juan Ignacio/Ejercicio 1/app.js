import express from "express"
import { sumasRouter } from "./suma.js"
import { divisionesRouter } from "./division.js"
import { RestaRouter } from "./resta.js"
import { multRouter } from "./multiplicacion.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/suma",sumasRouter)
app.use("/division",divisionesRouter)
app.use("/resta",RestaRouter)
app.use("/multiplicacion",multRouter)


app.listen(port, ()=>{
    console.log("esto funciona")
})