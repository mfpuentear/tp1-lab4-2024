import express from 'express';
export const multiplicacionesRouter = express.Router();

//Array de objetos multiplicacion
let multiplicaciones = [];
let multiplicacionesMaxId = 0;


//GET Multiplicaciones
multiplicacionesRouter.get("/", (req,res) => {
    res.status(200).send({multiplicaciones});
});


//GET Multiplicacion especifica
multiplicacionesRouter.get("/:id", (req,res) =>{
    const id = req.params.id;
    const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);    
    if(!multiplicacion){
        res.status(404).send({mensaje:'Multiplicacion no encontrada!'});
    }else{
        res.send({data: multiplicacion});
    }
})


//POST de Multiplicacion
multiplicacionesRouter.post("/", (req,res) => {
    const a = req.body.a;
    const b = req.body.b;
    const multiplicacion = {id: ++multiplicacionesMaxId, a, b, resultado: a * b, fecha: new Date()};
    multiplicaciones.push(multiplicacion);
    res.status(201).send({multiplicacion});
});

//PUT /multplicaciones/:id
multiplicacionesRouter.put('/:id', (req,res) =>{
    const { id } = req.params;
    const multiplicacion = multiplicaciones.find((multplicacion) => multplicacion.id == parseInt(id));
    if(!multiplicacion){
        res.status(400).send({mensaje:"Multiplicacion no encontrada!"});
    }else{
        const a = req.body.a;
        const b = req.body.b;
        const multiplicacionModificada = {id : parseInt(id), a, b, resultado:a*b, fecha:new Date()};   
        multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id == id ?  multiplicacionModificada : multiplicacion));
        res.status(200).send({multiplicacionModificada});
    }
});


//DELETE /multiplicaciones/:id
multiplicacionesRouter.delete('/:id', (req,res) =>{
    const {id} = req.params;
    const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == parseInt(id));
    if(!multiplicacion){
        res.status(400).send({mensaje:"Multiplicacion no encontrada!"});
    }else{
        multiplicaciones = multiplicaciones.filter((multiplicacion) => multiplicacion.id != parseInt(id));
        res.status(200).send({ id });
    }
});