import express from "express";
import cors from "cors";
import { productosRouter } from "./productos.js";

const app = express();
const port = 3000;

// interpretar json en body
app.use(express.json());

// habilitamos cors
app.use(cors());

app.use("/productos", productosRouter);

app.listen(port, () => {
  console.log(`la app esta funcionando en ${port}`);
});
