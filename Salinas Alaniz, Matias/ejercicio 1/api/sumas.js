import express from 'express'

export const sumasRoute = express.Router()


let sumas = []

// GET /sumas
sumasRoute.get('/', (req, res) =>{
    res.send({data: sumas})
})

//GET /sumas/:id
sumasRoute.get('/:id', (req,res) =>{
    const id = req.params.id
    const suma = sumas.find((suma)=> suma.id == id);
    res.send({data: suma})
})
//post /sumas
sumasRoute.post('/', (req,res) => {

    const id = (sumas.length == 0 ? 1 : sumas[sumas.length-1].id + 1)
    const a = +req.body.a
    const b = +req.body.b
    const suma = { id , a ,b , resultado: a + b}
    sumas.push(suma)
    res.status(201).send({data: suma})
})

sumasRoute.delete('/:id',(req, res)=> {
    const { id } = req.params;
    sumas = sumas.filter((suma) => suma.id != id);
    res.status(200).send({id})
})

sumasRoute.put("/:id",(req, res) => {
    const id = req.params.id
    const {a,b} = req.body;
    
    //con find
    // const suma = sumas.find((suma)=> suma.id == id);
    // suma.a = +a;
    // suma.b = +b;
    // suma.resultado = a + b
    // suma.fecha = new Date()
    
    const sumaModificada = {id,a,b,resultado : +a + +b , fecha: new Date()}
    //con forEach
    // sumas.forEach((suma, indice)=>{
    //     if (suma.id == id){
    //         suma[indice] = sumaModificada
    //     }
    // })

    //con map
    sumas = sumas.map((suma)=> suma.id==id ? sumaModificada : suma);

    res.status(200).send({suma: sumaModificada})
})