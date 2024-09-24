import express from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())



app.listen(port, () => {
  console.log(`La aplicación está funcionando en el puerto: ${port}`)
})