import express from "express";
import { tareasRoute } from "./tareas.js";
import cors from "cors";

const app = express();
const port = 3004;

//interpretar json en body
app.use(express.json());

//habilitar cors
app.use(cors());

app.use("/tareas", tareasRoute);

app.get("/", (req, res) => {
  res.send("tareas a realizar");
});

app.listen(port, () => {
  console.log(`alojado en el puerto: ${port}`);
});
