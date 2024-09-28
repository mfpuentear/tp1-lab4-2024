import express from "express";
import { sumasRoute } from "./sumas.js";
import { divisionesRoute } from "./diviones.js";
import { multiplicacionesRoute } from "./multiplicaciones.js";
import { restasRoute } from "./restas.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {

    res.send("hola que tal");
});
app.use("/sumas", sumasRoute);

app.use("/divisiones", divisionesRoute);

app.use("/multiplicaciones", multiplicacionesRoute);

app.use("/restas", restasRoute);

app.listen(port, () => {
    console.log(`alojado en el puerto: ${port}`);
});