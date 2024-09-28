import  express  from  "express"
import cors from "cors"
import sumasRouter from "./sumas.js"
import restasRouter from "./restas.js"
import multiplicacionesRouter from "./multiplicaciones.js"
import divisionesRouter from "./divisiones.js"

const app = express()
const port = 3000


app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});



app.use("/restas", restasRouter)
app.use("/sumas", sumasRouter)
app.use("/multiplicaciones", multiplicacionesRouter)
app.use("/divisiones", divisionesRouter)




app.listen(port, () => {
    console.log(`La app esta funcionando en el puerto: ${port}`)
})