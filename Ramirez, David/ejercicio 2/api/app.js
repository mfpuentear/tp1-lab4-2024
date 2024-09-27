import express from "express"
import cors from "cors"
import {calculosRouter} from "./calculos.js"

const app = express();
const port = 3000;

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

app.get("/", (req, res) => {
    res.send("Api en funcionamiento :)");
});

// Ruta de calculos
app.use("/calculos", calculosRouter);

app.listen(port, () => {
    console.log(`La aplicación está funcionando en ${port}`);
});