import express from "express";
import cors from "cors";
import tareasRoute from "./tareas.js";

const app = express();
const port = 3000;

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/tareas", tareasRoute);


app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});