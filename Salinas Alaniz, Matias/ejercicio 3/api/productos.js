import express from 'express'

export const productosRouter = express.Router()
let productos = [
    {id:1,nombre:"Tomate",precio:998}
]


productosRouter.get('/',(req , res) =>{
    res.status(200).send({data: productos})
})

productosRouter.post('/',(req, res) =>{
    const id = (productos.length < 1) ? 1 : productos[productos.length-1].id + 1;
    let {nombre, precio} = req.body
    const encontrado = productos.find((producto)=>producto.nombre == nombre);
    if (encontrado !== undefined){
        res.status(400).send('Ya existe un productos con ese nombre')
    }else if (parseFloat(precio) < 0){
        res.status(400).send('No se admiten precios negativos')
    }
    
    else{
        precio = parseFloat(precio)
        const productoNuevo = {id, nombre, precio}
        productos.push(productoNuevo)
        res.status(201).send({data:productoNuevo})
    }
})

productosRouter.put('/:id', (req , res) => {
    const id = parseInt(req.params.id)
    const {nombre, precio} = req.body

    const productoEditado =  { id, nombre , precio , fecha: new Date()}
    productos = productos.map((producto)=> (producto.id == id) ? productoEditado : producto)
    res.status(200).send({data:productoEditado})
}) 

productosRouter.delete('/:id', (req, res)=>{
    const { id } = req.params
    productos = productos.filter((producto)=>producto.id == id)
    res.status(200).send('Eliminado')
})