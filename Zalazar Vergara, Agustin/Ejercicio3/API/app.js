import express from "express";
import cors from "cors";
import productosRoutes from ".productos.js";

const app = express();
const port = 3000;

// Interpretar send en el body.
app.use(express.send());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Ejercicio 3");
});

app.use("/productos", productosRoutes);

app.listen(port, ()=>{
    console.log(`Servidor levantado en http://localhost:${port}`);
});