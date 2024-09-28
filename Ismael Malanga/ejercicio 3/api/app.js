import express from 'express'
import productosRoute from "./productos.js"
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hola Mundo!")
})
app.use("/productos", productosRoute)

app.listen(port, () => {
    console.log(`La app esta escuchando el puerto ${port}`)
})