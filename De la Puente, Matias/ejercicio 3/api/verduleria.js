import { Router } from "express";

export const verduleriaRouter = Router()

let productos = [];
let prodMaxID = 0;

verduleriaRouter.get("/", (req,res)=>{
    res.send({ productos })
})

verduleriaRouter.get("/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const producto = productos.find((producto)=>producto.id = id)
    if(!producto){
        return res.status(404).send({ error:"Producto no encontrado" })
    }
    res.send({ producto })
})

verduleriaRouter.post("/", (req,res)=>{
    const { producto, precio } = req.body;
    const data = {id: ++prodMaxID, producto: producto, precio: precio, fecha: new Date()}
    productos.push(data)
    res.status(200).send( {data} )
})

verduleriaRouter.delete("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    productos = productos.filter((producto)=>producto.id !== id)
    res.status(200).send({ productos })
})

verduleriaRouter.put("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const { producto, precio } = req.body;
    const data = productos.find((producto)=>producto.id == id)
    if(!data){
        res.status(404).send({ error: "Producto no encontrado." })
    }
    data.producto = producto;
    data.precio = precio;
    res.send({data})
})