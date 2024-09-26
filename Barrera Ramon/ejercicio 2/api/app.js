import express from "express";
import cors from "cors";
import periRoute from "./perimetro.js"
import supRoute from "./superficie.js"

const app = express();
const port = 3000;

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/perimetro", periRoute);
app.use("/superficie", supRoute);

// app.use("/perimetro", perimetro);


app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});