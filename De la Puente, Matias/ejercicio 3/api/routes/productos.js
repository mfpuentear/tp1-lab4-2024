import express from "express";
const router = express.Router();

let productos = [
    {id: 1, nombre: "peras", precio: 300}
]

let maxId = 0;

router.get("/", (req, res)=>{
    res.json({productos});
})

router.get("/:id", (req, res)=>{
    const { id } = req.params;
    const producto = productos.find((prod) => prod.id == id);
    if(producto){
        res.status(200).json({producto});
    }else{
        res.status(400).json({error: `No se encontro el producto con el id ${id}`})
    }
})

router.post("/", (req, res)=>{
    const {nombre, precio} = req.body;
    if(precio <= 0){
        return res.status(400).json({error: "El precio debe ser positivo"});
    }
    const existe = productos.find((prod)=> prod.nombre.toLowerCase() === nombre.toLowerCase());
    if(existe){
        return res.status(400).json({error: "No puede haber dos productos con el mismo nombre"});
    }
    const producto = {id: ++maxId, nombre, precio};
    productos.push(producto);
    return res.status(201).json({producto});
})

router.put("/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const {nombre, precio} = req.body;
    if(precio <= 0){
        return res.status(400).json({error: "El precio debe ser positivo"});
    }
    const existe = productos.find((prod)=> prod.nombre.toLowerCase() === nombre.toLowerCase());
    if(existe){
        return res.status(400).json({error: "No puede haber dos productos con el mismo nombre"});
    }

    const productoModificado = {id, nombre, precio};
    productos = productos.map((prod) => prod.id == id ? productoModificado : prod);
    return res.status(200).json({producto: productoModificado});

})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    productos = productos.filter((prod) => prod.id != id);
    return res.status(200).json({id});
})

export default router;