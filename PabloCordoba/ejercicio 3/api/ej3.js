const express = require ("express")
const app = express()
const cors = require ("cors")

const PORT = 5300

app.use(express.json())
app.use(cors)

let listado = []


app.get("/productos",(req,res)=>{
    res.json(listado)
})

app.post("/productos", (req,res)=>{
    const [producto, precio] = req.body
    if(precio<0){
        return res.status(400).send("El precio no puede ser negativo")
    }

    listado.forEach(producto =>{
        if(prod[0] == producto){
           return res.status(400).send("El producto ya existe")
        }
    })

    listado.push([producto,precio])
    res.json(listado)
})

app.put("/productos/:indice", (req,res)=>{
    const {indice} = req.params
    const {producto, precio} = req.body

    if(precio<0){
        return res.status(400).send("El precio no puede ser negativo")
    }

    if (indice<0 || indice >= listado.length) {
        return res.status(404).send("Producto no existe")
    }

    listado [indice] = [producto,precio]
    res.json(listado)
})

app.delete("/productos/:indice",(req,res)=>{
    const {indice} = req.params
    listado.splice(indice, 1)
    res.json(listado)
})

app.listen(PORT, console.log(`servidor escuchando en ${PORT}`))