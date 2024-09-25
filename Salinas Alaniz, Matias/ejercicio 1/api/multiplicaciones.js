import express from 'express'

export const multiplicacionesRoute = express.Router()

let multiplicaciones = [
    {id:1, a:4, b:2, resultado: 8},
]

// GET /multiplicaciones
multiplicacionesRoute.get('/', (req, res) =>{
    res.send({data: multiplicaciones})
})

//GET /multiplicaciones/:id
multiplicacionesRoute.get('/:id', (req,res) =>{
    const id = req.params.id
    const multiplicacion = multiplicaciones.find((multiplicacion)=> multiplicacion.id == id);
    res.send({data: multiplicacion})
})
//post /multiplicaciones
multiplicacionesRoute.post('/', (req,res) => {
    const {a, b} = req.body
    if (b==0){
        res.status(400).send({mensaje:"multiplicacion por 0"})
    }else{
        const id = multiplicaciones[multiplicaciones.length-1].id + 1
        const multiplicacion = { id ,a ,b , resultado: a * b}
        multiplicaciones.push(multiplicacion)
        res.status(201).send({data: multiplicacion})
    }
})

multiplicacionesRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    multiplicaciones = multiplicaciones.filter((multiplicacion)=> multiplicacion.id != id);
    res.status(202).send({id})
})

multiplicacionesRoute.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {a , b} = req.body

        const multiplicacionModificada = { id ,a ,b , resultado: a * b, fecha: new Date()}
        multiplicaciones = multiplicaciones.map((multiplicacion) => multiplicacion.id == id ? multiplicacionModificada : multiplicacion)
        res.status(201).send({data: multiplicacionModificada})
    
})

