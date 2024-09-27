import express from "express";
const router = express.Router();

let productos = []

let maxId = 0;

router.get("/", (req, res)=>{
    return res.send({productos});
})

router.get("/:id", (req, res)=>{
    const { id } = req.params;
    const producto = productos.find((prod) => prod.id == id);
    if(producto){
        res.status(200).send({producto});
    }else{
        res.status(404).send({error: `No se encontro el producto con el id ${id}`})
    }
})

router.post("/", (req, res)=>{
    const {nombre, precio} = req.body;
    if(precio <= 0){
        return res.status(400).send({error: "El precio debe ser positivo"});
    }
    const existe = productos.some((prod)=> prod.nombre.toLowerCase() === nombre.toLowerCase());
    if(existe){
        return res.status(400).send({error: "No puede haber dos productos con el mismo nombre"});
    }
    const producto = {id: ++maxId, nombre, precio};
    productos.push(producto);
    return res.status(201).send({producto});
})

router.put("/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const {nombre, precio} = req.body;
    if(precio <= 0){
        return res.status(400).send({error: "El precio debe ser positivo"});
    }
    const existe = productos.some((prod)=> prod.nombre.toLowerCase() === nombre.toLowerCase() && prod.id !== id);
    if(existe){
        return res.status(400).send({error: "No puede haber dos productos con el mismo nombre"});
    }

    const productoModificado = {id, nombre, precio};
    productos = productos.map((prod) => prod.id == id ? productoModificado : prod);
    return res.status(200).send({producto: productoModificado});

})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    productos = productos.filter((prod) => prod.id != id);
    return res.status(200).send({id});
})

export default router;