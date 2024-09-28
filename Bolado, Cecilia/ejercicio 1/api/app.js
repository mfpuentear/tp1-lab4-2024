import express from "express"
import cors from "cors"
import sumasRouter  from "./suma.js"
import restasRouter from "./resta.js"
import multiplicacionRouter from "./multiplicacion.js"
import divisionesRouter from "./division.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

//app.use("/api/suma")
app.get("/", (req, res) =>{
    res.send("Hola Mundo")
})

app.use("/suma", sumasRouter)
app.use("/resta" , restasRouter)
app.use("/multiplicacion", multiplicacionRouter)
app.use("/division", divisionesRouter)

app.listen(port, () =>{
    console.log (`La app se está ejecutando en el puerto ${port}`)
})

