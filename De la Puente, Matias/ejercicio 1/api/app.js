import express from "express";
import cors from "cors";
import sumasRouter from "./sumas.js";
import DivisionesRouter  from "./divisiones.js";
import RestaRouter from "./restas.js";
import MultiplicacionesRouter from "./multiplicaciones.js";


const port = 3000;
const app = express()

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/multiplicaciones", MultiplicacionesRouter)
app.use("/sumas", sumasRouter);
app.use("/divisiones", DivisionesRouter);
app.use("/restas",RestaRouter);

app.listen(port, () => {
    console.log(`La aplicacion esta funcionando en: ${port}`);
});