import express from 'express'
import cors from 'cors'
import { tareasRouter } from './tareas.js'

const app = express()
const PORT = 3000

app.use(cors())

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hola mundo')
})

app.use('/tareas', tareasRouter)

app.listen(PORT,()=>{
    console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})