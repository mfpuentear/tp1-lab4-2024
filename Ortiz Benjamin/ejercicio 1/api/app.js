import express from "express";
import cors from "cors";
import { sumasRouter } from "./sumas.js";
import { divisionesRouter } from "./divisiones.js";
import { restasRouter } from "./restas.js";
import { multiplicacionesRouter } from "./multiplicaciones.js";

const app = express();
const port = 3000;

// interpretar json en body
app.use(express.json());

// habilitamos cors
app.use(cors());

app.use("/sumas", sumasRouter);
app.use("/divisiones", divisionesRouter);
app.use("/restas", restasRouter);
app.use("/multiplicaciones", multiplicacionesRouter);

app.listen(port, () => {
  console.log(`la app esta funcionando en ${port}`);
});
