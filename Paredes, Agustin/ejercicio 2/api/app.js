import express  from  "express"
import cors from "cors"
import calculosRouter from "./calculos.js"


const app = express()
const port = 3000


app.use(cors());
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hola mundo desde ejercicio2!").status(201);
});

app.use("/calculos", calculosRouter)


app.listen(port, () => {
    console.log(`La app esta funcionando en el puerto: ${port}`)
})