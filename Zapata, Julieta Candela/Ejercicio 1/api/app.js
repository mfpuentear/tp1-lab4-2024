import express from "express"
import cors from "cors"
import { sumasRouter } from "./sumas.js";
import { divisionesRouter } from "./divisiones.js";
import { restasRouter } from "./restas.js";
import { multiplicacionesRouter } from "./multiplicaciones.js";

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.use("/sumas", sumasRouter);
app.use("/divisiones", divisionesRouter);
app.use("/restas", restasRouter);
app.use("/multiplicaciones", multiplicacionesRouter);

app.listen(port, () => {
    console.log(`La app esta funcionando en ${port}`)
})

// app.get("/", (req,res) => {
//     res.send("Hola mundo")
// })

// //suma 
// app.post("/suma", (req,res) => {
//     const {n1,n2} = req.body
//     const suma = {resultado: n1+n2}
//     res.status(200).send({suma})
// })

// //resta
// app.post("/resta", (req,res) => {
//     const {n1,n2} = req.body
//     const resta = {resultado: n1-n2}
//     res.status(200).send({resta})
// })

// //multiplicacion
// app.post("/multiplicacion", (req,res) => {
//     const {n1,n2} = req.body
//     const multiplicacion = {resultado: n1*n2}
//     res.status(200).send({multiplicacion})
// })

// //division
// app.post("/division", (req,res) => {
//     const {n1,n2} = req.body
//     if (n1 === 0 || n2 === 0) {
//         res.send({error: "no se puede dividir en 0"})
//         return
//     }
//     const division = {resultado: n1/n2}
//     res.status(200).send({division})
// })

