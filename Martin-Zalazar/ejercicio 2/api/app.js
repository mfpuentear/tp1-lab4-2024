import express from "express";
import cors from "cors";
import rectanguloRoutes from "./routes/rectangulo.js";

const app = express();
const PORT = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola")
});

app.use("/rectangulos", rectanguloRoutes);

app.listen(PORT, (err)=>{
    console.log(
        err
        ? "Se produjo un error al iniciar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
});