import express from "express";
import { alumnosRoute } from "./alumnos.js";
import cors from "cors";

const app = express();
const port = 3004;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("listado de alumnos api");
});

app.use("/alumnos", alumnosRoute);

app.listen(port, () => {
  console.log(`alojado en el puerto: ${port}`);
});