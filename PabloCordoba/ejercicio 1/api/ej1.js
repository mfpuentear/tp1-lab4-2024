const express = require ("express")
const app = express()
const cors = require ("cors")

app.use(cors())
const PORT = 5300

app.use(express.json())

app.post("/suma", (req,res)=>{
    const {num1, num2} = req.body
    const resultado = num1 + num2
    res.json({"resultado":resultado});
})
app.post("/resta",(req,res)=>{
    const {num1, num2} = req.body
    const resultado = num1 - num2
    res.json({"resultado":resultado});
})
app.post("/multiplicacion",(req,res)=>{
    const {num1, num2} = req.body
    const resultado = num1 * num2
    res.json({"resultado":resultado});
})
app.post("/division",(req,res)=>{
    const {num1, num2} = req.body
    if (num2===0){
        return res.json({"resultado": "no se puede dividir entre 0"})
    }
    const resultado = num1 / num2
    res.json({"resultado":resultado})
})

app.listen(PORT, console.log("Servidor en el puerto 5300"))
