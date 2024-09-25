import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos";

const app = express();
const PORT = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Ejercicio 3");
});

app.use("/", productosRoutes);

app.listen(PORT, (err)=>{
    console.log(
        err
        ? "Se produjo un error al iniciar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
});