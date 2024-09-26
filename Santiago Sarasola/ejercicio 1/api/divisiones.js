import express from 'express';
export const divisionesRouter = express.Router();

//Array de objetos division
let divisiones = [];
let divisionesMaxId = 0;


//GET Divisiones
divisionesRouter.get("/", (req,res) => {
    res.status(200).send({divisiones});
});


//GET Division especifica
divisionesRouter.get("/:id", (req,res) =>{
    const id = req.params.id;
    const division = divisiones.find((division) => division.id == id);    
    if(!division){
        res.status(404).send({mensaje:'Division no encontrada!'});
    }else{
        res.send({data: division});
    }
})


//POST de Division
divisionesRouter.post("/", (req,res) => {
    const a = req.body.a;
    const b = req.body.b;
    if(b===0){
        res.status(400).send({mensaje:'Division por 0 no valida!'});
        return;
    }

    const division = {
        id: ++divisionesMaxId,
        a,
        b, 
        resultado: a / b, 
        fecha: new Date()};
    divisiones.push(division);
    res.status(201).send({data: division});
});

//PUT /divisiones/:id
divisionesRouter.put('/:id', (req,res) =>{
    const { id } = req.params;

    const division = divisiones.find((division) => division.id == parseInt(id));
    if(!division){
        res.status(400).send({mensaje:"division no encontrada!"});
    }else{
        const a = req.body.a;
        const b = req.body.b;
        if(b===0){
            res.status(400).send({mensaje:'Division por 0 no valida!'});
        }else{
            division.a = a;
            division.b = b;
            division.resultado = a / b;
            division.fecha = new Date();
            res.status(200).send({division});
        }
    }
});


//DELETE /divisiones/:id
divisionesRouter.delete('/:id', (req,res) =>{
    const {id} = req.params;
    const division = divisiones.find((division) => division.id == parseInt(id));
    if(!division){
        res.status(400).send({mensaje:"division no encontrada!"});
    }else{
        divisiones = divisiones.filter((division) => division.id != parseInt(id));
        res.status(200).send({ id });
    }
});