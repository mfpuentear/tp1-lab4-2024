import express from "express";
import { productosRoute } from "./productos.js";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());

app.use(cors());

app.use("/productos", productosRoute);

app.get("/", (req, res) => {
  res.send("precios productos api");
});

app.listen(port, () => {
  console.log(`alojado en el puerto: ${port}`);
});