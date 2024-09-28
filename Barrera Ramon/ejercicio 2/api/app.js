import express from "express";
import cors from "cors";
import { rectangulosRouter } from "./rectangulos.js";

const app = express();
const port = 3000;

// interpretar json en body
app.use(express.json());

// habilitamos cors
app.use(cors());

app.use("/rectangulos", rectangulosRouter);

app.listen(port, () => {
  console.log(`la app esta funcionando en ${port}`);
});
