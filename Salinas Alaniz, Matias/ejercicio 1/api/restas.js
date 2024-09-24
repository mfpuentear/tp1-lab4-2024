import express from 'express'

export const restasRoute = express.Router()

let restas = [
    {id:1, a:4, b:2, resultado: 2},
    {id:2, a:50, b:5, resultado: 45},
    {id:3, a:6, b:1, resultado: 5},
]

// GET /restas
restasRoute.get('/', (req, res) =>{
    res.send({data: restas})
})

//GET /restas/:id
restasRoute.get('/:id', (req,res) =>{
    const id = req.params.id
    const resta = restas.find((resta)=> resta.id == id);
    res.send({data: resta})
})
//post /restas
restasRoute.post('/', (req,res) => {
    const {a, b} = req.body
    if (b==0){
        res.status(400).send({mensaje:"resta por 0"})
    }else{
        const id = restas[restas.length-1].id + 1
        const resta = { id ,a ,b , resultado: a - b}
        restas.push(resta)
        res.status(201).send({data: resta})
    }
})

restasRoute.delete('/:id', (req, res) => {
    const { id } = req.params;
    restas = restas.filter((resta)=> resta.id != id);
    res.status(202).send({id})
})

restasRoute.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {a , b} = req.body

        const restaModificada = { id ,a ,b , resultado: a - b, fecha: new Date()}
        restas = restas.map((resta) => resta.id == id ? restaModificada : resta)
        res.status(201).send({data: restaModificada})
    
})

