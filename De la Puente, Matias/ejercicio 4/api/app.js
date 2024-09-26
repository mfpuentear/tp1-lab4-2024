import express from "express";
import cors from "cors";
import alumnosRoutes from "./routes/alumnos.js";

const app = express();
const PORT = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Ejercicio 4");
});

app.use("/alumnos", alumnosRoutes);

app.listen(PORT, (err)=>{
    console.log(
        err
        ? "Se produjo un error al iniciar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
});

