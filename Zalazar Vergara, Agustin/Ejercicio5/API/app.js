import express from "express";
import cors from "cors";
import tareasRoutes from "./tareas.js";

const app = express();
const port = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Ejercicio 5");
});

app.use("/tareas", tareasRoutes);

app.listen(port, ()=>{
    console.log(`Servidor levantado en http://localhost:${port}`);
});