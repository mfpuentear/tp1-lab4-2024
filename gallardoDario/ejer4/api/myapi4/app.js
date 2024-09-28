import express from "express";
import cors from "cors";
import { alumnosRouter } from "./listaAlumnos.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!alumnos");
});

app.use("/alumnos", alumnosRouter);

app.listen(port, () => {
  console.log(`desde alumnos${port}`);
});
