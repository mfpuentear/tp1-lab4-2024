import express from "express";
import { tareasRoute } from "./tareas.js";
import cors from "cors";

const app = express();
const port = 3005;

app.use(express.json());

app.use(cors());

app.use("/tareas", tareasRoute);

app.get("/", (req, res) => {
  res.send("tareas a realizar");
});

app.listen(port, () => {
  console.log(`alojado en el puerto: ${port}`);
});