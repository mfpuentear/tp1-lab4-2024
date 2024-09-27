import express from "express";
import { perimetrosRouter } from "./perimetro.js";
import { superficieRouter } from "./superficie.js";
const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worlddesdes perimetro!");
});
app.use(express.json());
app.use("/perimetros", perimetrosRouter);
app.use("/superficies", superficieRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
