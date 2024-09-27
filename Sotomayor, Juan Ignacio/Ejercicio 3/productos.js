import express from "express"

export const productosRouter = express.Router()

let lista = []
let idProducto = 0 

productosRouter.get("/",(req,res)=>{
    res.send(lista)
})

productosRouter.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const item = lista.find((item)=>item.id===id)

    res.send(item)
})

productosRouter.post("/",(req,res)=>{
    const {nombre, precio}= req.body

    const producto = {
        id:++idProducto,
        nombre,
        precio
    }
lista.push(producto)
res.send(producto)
})

productosRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const producto = lista.find((item)=>item.id==id)

    if (producto){
        lista = lista.filter((item)=>item.id!==id)
        res.send("Producto eliminado")
    }
    else{
        res.status(404).send("No se encontro el producto")
    }
    
})

productosRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {nombre, precio}=req.body


    if (lista.find((item)=>item.id===id)){
        const productoModificado={id,nombre,precio}
        lista=lista.map((item)=>item.id ===id ? productoModificado: item)
        res.status(200).send(productoModificado)
    }
    else{
        res.status(404).send("Producto no encontrado")
    }
})