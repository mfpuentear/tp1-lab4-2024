import express from "express";
import cors from "cors";
import alumnosRoutes from "./alumnos.js";

const app = express();
const port = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Ejercicio 4");
});

app.use("/alumnos", alumnosRoutes);

app.listen(port, ()=>{
    console.log(`Servidor levantado en http://localhost:${port}`);
});

