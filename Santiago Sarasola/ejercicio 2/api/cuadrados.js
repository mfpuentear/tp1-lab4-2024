import express, { Router } from 'express';
export const cuadradoRouter = express.Router();

let perimetrosYSuperficies = [];
let perimetrosYSuperficiesMaxId = 0;

//GET Calculos
cuadradoRouter.get("/", (req,res) => {
    res.status(200).send({perimetrosYSuperficies});
});

//GET Calculo especifico
cuadradoRouter.get("/:id", (req,res) => {
    const id = req.params.id;
    const calculo = perimetrosYSuperficies.find((calculo) => calculo.id == id);    

    if(!calculo){
        res.status(400).send({mensaje:"Cuadrado no encontrado!"});
    }else{
        res.status(200).send({calculo});
    }
});

//POST Calculo
cuadradoRouter.post("/", (req, res) => {
        const lado = req.body.lado;
        const forma = req.body.forma;
        let perimetro = 4 * parseInt(lado);
        let superficie = parseInt(lado * lado);
        const calculo = {id: ++perimetrosYSuperficiesMaxId, lado: lado, perimetro: perimetro, superficie: superficie, forma: forma, fecha: new Date()};
        perimetrosYSuperficies.push(calculo);
        res.status(201).send({calculo});
});

//PUT /calculos/:id 
cuadradoRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const calculo = perimetrosYSuperficies.find((calculo) => calculo.id == id);
    if(!calculo){
        res.status(400).send({mensaje:"Cuadrado no encontrado!"});
    }else{
        const lado = req.body.lado;
        const forma = req.body.forma;
        let perimetro = 4 * parseInt(lado);
        let superficie = parseInt(lado * lado);
        const calculoModificado = {id: parseInt(id), lado: lado, perimetro: perimetro, superficie: superficie, forma: forma, fecha: new Date()};
        perimetrosYSuperficies = perimetrosYSuperficies.map((calculo) => (calculo.id == id ?  calculoModificado : calculo));
        res.status(201).send({calculoModificado});
    }
});

//DELETE Calculo
cuadradoRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const calculo = perimetrosYSuperficies.find((calculo) => calculo.id == id);
    if(!calculo){
        res.status(400).send({mensaje:"Cuadrado no encontrado"});
    }else{
        perimetrosYSuperficies = perimetrosYSuperficies.filter((calculo) => calculo.id != parseInt(id));
        res.status(200).send({ id });
    }
})