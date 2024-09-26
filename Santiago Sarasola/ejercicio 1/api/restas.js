import express, { Router } from 'express';
export const restasRouter = express.Router();

//Array de objetos suma
let restas = [];
let restasMaxId = 0;


//GET Restas
restasRouter.get("/", (req,res) => {
    res.status(200).send({restas});
});


//GET Resta especifica
restasRouter.get("/:id", (req,res) =>{
    const id = req.params.id;
    const resta = restas.find((resta) => resta.id == id);    
    if(!resta){
        res.status(404).send({mensaje:'Resta no encontrada!'});
    }else{
        res.status(200).send({resta});
    }
})


//POST de Resta
restasRouter.post("/", (req,res) => {
    const a = req.body.a;
    const b = req.body.b;
    const resta = {id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date()};
    restas.push(resta);
    res.status(201).send({resta});

});


//PUT /restas/:id
restasRouter.put('/:id', (req,res) =>{
    const { id } = req.params;

    const resta = restas.find((resta) => resta.id == parseInt(id));
    if(!resta){
        res.status(400).send({mensaje:"Resta no encontrada!"});
    }else{
        const a = req.body.a;
        const b = req.body.b;
        resta.a = a;
        resta.b = b;
        resta.resultado = a - b;
        resta.fecha = new Date();
        res.status(200).send({resta});
    }
})


//DELETE /restas/:id
restasRouter.delete('/:id', (req,res) =>{
    const {id} = req.params;
    const resta = restas.find((resta) => resta.id == parseInt(id));
    if(!resta){
        res.status(400).send({mensaje:"Resta no encontrada!"});
    }else{
        restas = restas.filter((resta) => resta.id != parseInt(id));
        res.status(200).send({ id });
    }
});