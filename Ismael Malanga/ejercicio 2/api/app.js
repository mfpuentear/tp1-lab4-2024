import express from "express";
import cors from "cors";
import perimetroRoute from "./perimetro.js"
import superficieRoute from "./superficie.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/perimetro", perimetroRoute);
app.use("/superficie", superficieRoute);


app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});