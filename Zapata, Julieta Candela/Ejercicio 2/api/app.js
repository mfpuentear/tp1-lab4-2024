import express from "express"
import cors from "cors"
import {calculosRouter} from "./calculos.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.use("/calculos", calculosRouter);

app.listen(port, () => {
    console.log(`La app esta funcionando en ${port}`);
});