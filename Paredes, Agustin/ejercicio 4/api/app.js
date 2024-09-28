import express from "express";
import  alumnosRouter  from "./alumnos.js";
import cors from "cors";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo desde ejercicio4!");
});

app.use("/alumnos", alumnosRouter);

app.listen(port, () => {
    console.log(`La app esta funcionando en el puerto: ${port}`)
})