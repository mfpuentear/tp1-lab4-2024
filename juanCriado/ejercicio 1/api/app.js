import express from "express";

import cors from "cors";
import sumaRouter from "./suma.js";
import restaRouter from "./resta.js";
import multiplicacionRouter from "./multiplicacion.js";
import divisionRouter from "./division.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/suma", sumaRouter);
app.use("/resta", restaRouter);
app.use("/multiplicacion", multiplicacionRouter);
app.use("/multiplicacion", divisionRouter);

app.listen(port, () => {
  console.log(`la aplicacion esta funcionando en el puerto ${port}`);
});
