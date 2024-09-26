import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

//interpretar json en body
app.use(express.json());

//habilitar cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("precios productos api");
});

app.listen(port, () => {
  console.log(`alojado en el puerto: ${port}`);
});
