import express from "express";
import cors from "cors";
import { tareas } from "./tareas.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/tareas", tareas)

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});