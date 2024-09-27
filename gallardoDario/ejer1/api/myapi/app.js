import express from "express";
import cors from "cors";
import { sumasRouter } from "./suma.js";
import { divisionesRouter } from "./divisiones.js";
import { restaRouter } from "./resta.js";
import { multiplicacionesRouter } from "./multiplicacion.js";
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.use("/sumas", sumasRouter);
app.use("/divisiones", divisionesRouter);
app.use("/restas", restaRouter);
app.use("/multiplicaciones", multiplicacionesRouter);
app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en ${port}`);
});
