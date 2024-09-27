import express from "express";
import cors from "cors";
import sumasRoutes from "./sumas.js";
import divisionesRoutes from "./divisiones.js";
import multiplicacionesRoutes from "./multiplicaciones.js";
import restasRoutes from "./restas.js";

const app = express();
const port = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola")
});

app.use("/sumas", sumasRoutes);
app.use("/divisiones", divisionesRoutes);
app.use("/multiplicaciones", multiplicacionesRoutes);
app.use("/restas", restasRoutes);

app.listen(port, ()=>{
    console.log(`Servidor levantado en http://localhost:${port}`);
});