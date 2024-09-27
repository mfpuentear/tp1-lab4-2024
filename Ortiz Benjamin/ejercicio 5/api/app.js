import express from "express";
import cors from "cors";
import { tareasRouter } from "./tareas.js";

const app = express();
const port = 3000;

// interpretar json en body
app.use(express.json());

// habilitamos cors
app.use(cors());

app.use("/tareas", tareasRouter);

app.listen(port, () => {
  console.log(`la app esta funcionando en ${port}`);
});
