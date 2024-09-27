import express from "express";
import cors from "cors";
import alumnosRouter from "./alumnos.js";

const app = express();
const port = 3000;

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

app.use("/alumnos", alumnosRouter);

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
