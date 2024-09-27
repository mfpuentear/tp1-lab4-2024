import express from "express";
import { tareasRouter } from "./listaTareas.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Worldapi 5555!");
});
app.use(express.json());

app.use("/tareas", tareasRouter);

app.listen(port, () => {
  console.log(`ejecutando ${port}`);
});
