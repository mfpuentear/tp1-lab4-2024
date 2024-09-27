import express from "express";
import { productosRouter } from "./listaProductos.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! verduleria");
});
app.use(express.json());
app.use("/productos", productosRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
