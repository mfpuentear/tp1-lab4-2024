import express from "express";
import cors from "cors";

import { sumas } from "./sumas.js";
import { restas } from "./restas.js";
import { multiplicaciones } from "./multiplicaciones.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/sumas", sumas);
app.use("/restas", restas)
app.use("/multiplicaciones", multiplicaciones)

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
