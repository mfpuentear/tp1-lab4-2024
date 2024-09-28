import express, { Router } from 'express';
export const productosRouter = express.Router();

let productos = [];
let productosMaxId = 0;

//GET Precios
productosRouter.get("/", (req,res) => {
    res.status(200).send({productos});
});

//GET Producto especifico
productosRouter.get("/:id", (req,res) => {
    const id = req.params.id;
    const producto = productos.find((producto) => producto.id == id);    
    if(!producto){
        res.status(400).send({mensaje:"Producto no encontrado!"});
    }else{
        res.status(200).send({producto});
    }
});

//POST Productos
productosRouter.post("/", (req, res) => {
        const nombre = req.body.nombre;
        const precio = req.body.precio;
        const productoConMismoNombre = productos.find((producto) => producto.nombre.toLowerCase() == nombre.toLowerCase());  
        if(productoConMismoNombre){
            res.status(400).send({mensaje:"Ya hay un producto existente con el mismo nombre!"});
        }else if(precio < 0){
            res.status(400).send({mensaje:"El precio no puede ser negativo!"});
        }else{
            const nuevoProducto = {id: ++productosMaxId, nombre: nombre, precio: precio, fecha: new Date()};
            productos.push(nuevoProducto);
            res.status(201).send({nuevoProducto});
        }
});

//PUT /productos/:id 
productosRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const productoExistente = productos.find((producto) => producto.id == id);
    if(!productoExistente){
        res.status(400).send({mensaje:"Producto no encontrado!"});
    }else{
        const productoConMismoNombre = productos.find((producto) => producto.nombre.toLowerCase() == nombre.toLowerCase() && producto.id != id);  
        if(productoConMismoNombre){
            res.status(400).send({mensaje:"Ya hay un producto existente con el mismo nombre!"});
        }else if(precio<0){
            res.status(400).send({mensaje:"El precio no puede ser negativo!"});
        }else{
            const productoModificado = {id: parseInt(id), nombre: nombre, precio: precio, fecha: new Date()};
            productos = productos.map((producto) => (producto.id == id ?  productoModificado : producto));
            res.status(201).send({productoModificado});
        }
    }
});

//DELETE Producto
productosRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const producto = productos.find((producto) => producto.id == id);
    if(!producto){
        res.status(400).send({mensaje:"Producto no encontrado"});
    }else{
        productos = productos.filter((producto) => producto.id != parseInt(id));
        res.status(200).send({ id });
    }
})