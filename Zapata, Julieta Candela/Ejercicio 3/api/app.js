import express from "express";
import cors from "cors";
import verduleriaRouter from "./verduleria.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.use("/verduleria", verduleriaRouter);

app.listen(port, () => {
  console.log(`La app esta funcionando en ${port}`);
});