import express from "express";
import cors from "cors";
import { rectangulos } from "./rectangulos.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/rectangulos", rectangulos)

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
