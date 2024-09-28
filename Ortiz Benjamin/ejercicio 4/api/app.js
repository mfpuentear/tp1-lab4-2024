import express from "express";
import cors from "cors";
import { alumnosRouter } from "./alumnos.js";

const app = express();
const port = 3000;

// interpretar json en body
app.use(express.json());

// habilitamos cors
app.use(cors());

app.use("/alumnos", alumnosRouter);

app.listen(port, () => {
  console.log(`la app esta funcionando en ${port}`);
});
