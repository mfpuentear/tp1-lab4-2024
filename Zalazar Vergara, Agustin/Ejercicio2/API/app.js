import express from "express";
import cors from "cors";
import rectanguloRoutes from "./rectangulo.js";

const app = express();
const port = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Ejercicio2")
});

app.use("/rectangulos", rectanguloRoutes);

app.listen(port, ()=>{
    console.log(`Servidor levantado en http://localhost:${port}`);
});