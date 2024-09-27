import express from "express";
import cors from "cors";
import sumasRouter from "./sumas.js";
import { divisionesRoute } from "./divisiones.js";

const app = express();
const port = 3000;

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Resultados");
});

app.use("/sumas", sumasRouter);
app.use("/divisiones", divisionesRoute);

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
