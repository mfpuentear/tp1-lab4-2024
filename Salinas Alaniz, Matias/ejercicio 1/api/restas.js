import express from 'express'

export const restasRoute = express.Router()

let restas = []

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
        const id = (restas.length == 0 ? 1 : restas[restas.length-1].id + 1)
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

