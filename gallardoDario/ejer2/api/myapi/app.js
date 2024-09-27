import express from "express";
import { perimetrosRouter } from "./perimetro.js";

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/perimetros", perimetrosRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
