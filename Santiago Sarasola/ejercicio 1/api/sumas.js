import express, { Router } from 'express';
export const sumasRouter = express.Router();

let sumas = [];
let sumasMaxId = 0;

//GET Sumas
sumasRouter.get("/", (req,res) => {
    res.status(200).send({sumas});
});


//GET Suma especifica
sumasRouter.get("/:id", (req,res) =>{
    const id = req.params.id;
    const suma = sumas.find((suma) => suma.id == id);    
    if(!suma){
        res.status(404).send({mensaje:'Suma no encontrada!'});
    }else{
        res.status(200).send({suma});
    }
})


//POST de Suma
sumasRouter.post("/", (req,res) => {
    const a = req.body.a;
    const b = req.body.b;
    const suma = {id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date()};
    sumas.push(suma);
    res.status(201).send({suma});

});


//PUT /sumas/:id
sumasRouter.put('/:id', (req,res) =>{
    const { id } = req.params;
    const suma = sumas.find((suma) => suma.id == parseInt(id));
    if(!suma){
        res.status(400).send({mensaje:"Suma no encontrada!"});
    }else{
        const a = req.body.a;
        const b = req.body.b;
        const sumaModificada = {id : parseInt(id), a, b, resultado:a+b, fecha:new Date()};       
        sumas = sumas.map((suma) => (suma.id == id ?  sumaModificada : suma));
        res.status(200).send({sumaModificada});
    }
});


//DELETE /sumas/:id
sumasRouter.delete('/:id', (req,res) =>{
    const {id} = req.params;
    const suma = sumas.find((suma) => suma.id == parseInt(id));
    if(!suma){
        res.status(400).send({mensaje:"Suma no encontrada!"});
    }else{
        sumas = sumas.filter((suma) => suma.id != parseInt(id));
        res.status(200).send({ id });
    }
});