import express, { Router } from 'express';
export const rectanguloRouter = express.Router();

let perimetrosYSuperficies = [];
let perimetrosYSuperficiesMaxId = 0;

//GET Calculos
rectanguloRouter.get("/", (req,res) => {
    res.status(200).send({perimetrosYSuperficies});
});

//GET Calculo especifico
rectanguloRouter.get("/:id", (req,res) => {
    const id = req.params.id;
    const calculo = perimetrosYSuperficies.find((calculo) => calculo.id == id);    

    if(!calculo){
        res.status(400).send({mensaje:"Rectangulo no encontrado!"});
    }else{
        res.status(200).send({calculo});
    }
});

//POST Calculo
rectanguloRouter.post("/", (req, res) => {
        const largo = req.body.largo;
        const ancho = req.body.ancho;
        const forma = req.body.forma;
        let perimetro = 2 * parseInt(largo + ancho);
        let superficie = parseInt(largo * ancho);
        const calculo = {id: ++perimetrosYSuperficiesMaxId, perimetro: perimetro, superficie: superficie, forma: forma, fecha: new Date()};
        perimetrosYSuperficies.push(calculo);
        res.status(201).send({calculo});
});

//PUT /calculos/:id 
rectanguloRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const calculo = perimetrosYSuperficies.find((calculo) => calculo.id == id);
    if(!calculo){
        res.status(400).send({mensaje:"Rectangulo no encontrado!"});
    }else{
        const largo = req.body.largo;
        const ancho = req.body.ancho;
        const forma = req.body.forma;
        let perimetro = 2 * parseInt(largo + ancho);
        let superficie = parseInt(largo * ancho);
        const calculoModificado = {id: parseInt(id), perimetro: perimetro, superficie: superficie, forma: forma, fecha: new Date()};
        perimetrosYSuperficies = perimetrosYSuperficies.map((calculo) => (calculo.id == id ?  calculoModificado : calculo));
        res.status(201).send({calculoModificado});
    }
});

//DELETE Calculo
rectanguloRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const calculo = perimetrosYSuperficies.find((calculo) => calculo.id == id);
    if(!calculo){
        res.status(400).send({mensaje:"Rectangulo no encontrado"});
    }else{
        perimetrosYSuperficies = perimetrosYSuperficies.filter((calculo) => calculo.id != parseInt(id));
        res.status(200).send({ id });
    }
})