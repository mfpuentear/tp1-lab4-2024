import express from 'express'

export const divisionesRoute = express.Router()

const divisiones = [
    {id:1, a:4, b:2, resultado: 2},
    {id:2, a:50, b:5, resultado: 10},
    {id:3, a:6, b:1, resultado: 6},
]

// GET /divisiones
divisionesRoute.get('/', (req, res) =>{
    res.send({data: divisiones})
})

//GET /divisiones/:id
divisionesRoute.get('/:id', (req,res) =>{
    const id = req.params.id
    const division = divisiones.find((division)=> division.id == id);
    res.send({data: division})
})
//post /divisiones
divisionesRoute.post('/', (req,res) => {
    const {a, b} = req.body
    if (b==0){
        res.status(400).send({mensaje:"Division por 0"})
    }else{
        const division = { a ,b , resultado: a / b}
        divisiones.push(division)
        res.status(201).send({data: division})
    }
})
try {
    throw new Error("");
} catch (error) {
    
}
