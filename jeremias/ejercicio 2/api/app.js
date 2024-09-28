import express from "express";
import { rectangulosRoute } from "./rectangulo.js";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("api calculo perimetro");
});

app.use("/rectangulo", rectangulosRoute);

app.listen(port, () => {
  console.log(`alojado en el puerto: ${port}`);
});