import express from "express";
import { router as sumasRoutes} from "./routes/sumas.js";
import divisionesRoutes from "./routes/divisiones.js";
import multiplicacionesRoutes from "./routes/multiplicaciones.js";
import restasRoutes from "./routes/restas.js";

const app = express();
const PORT = 3000;

// Interpretar JSON en el body.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola")
});

app.use("/sumas", sumasRoutes);
app.use("/divisiones", divisionesRoutes);
app.use("/multiplicaciones", multiplicacionesRoutes);
app.use("/restas", restasRoutes);

app.listen(PORT, (err)=>{
    console.log(
        err
        ? "Se produjo un error al iniciar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
});