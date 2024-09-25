import express from "express";
import cors from "cors";
import PerimetroRouter from "./Perimetro.js"; 
import SuperficieRouter from "./Superficie.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/Perimetro", PerimetroRouter); 

app.use("/Superficie", SuperficieRouter)

app.listen(port, () => {
    console.log(`La aplicación está funcionando en: http://localhost:${port}`);
});
