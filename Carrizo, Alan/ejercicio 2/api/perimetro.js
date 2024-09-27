// Perimetro: La suma de todos los lados
import express from "express";

export const perimetroRouter = express.Router()

let calculos = [];
let calcMaxID = 0;

perimetroRouter.get("/", (req, res) => {
    res.send({ calculos });
});

perimetroRouter.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const perimetro = calculos.find((calculo)=> calculo.id == id)
         if (perimetro){
            res.send({ perimetro })
        }else{
            res.status(404).send({error: "Cálculo no encontrado."})
        }
})

perimetroRouter.post("/",(req,res)=>{
    const {a, b} = req.body;
    const data = {id: ++calcMaxID, ladoA: a, ladoB: b, perimetro: (a*2)+(b*2), fecha: new Date()}
    calculos.push(data)
    res.status(201).send({data})
})

perimetroRouter.delete("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    calculos = calculos.filter((calculo)=> calculo.id !== id)
    res.status(200).send(calculos)
})

perimetroRouter.put("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const {a,b} = req.body
    const data = calculos.find((perimetro)=>perimetro.id == id)
    if (!data){
        return res.status(404).send({ error: "Cálculo no encontrado." })
    }
    data.ladoA = a;
    data.ladoB = b;
    data.perimetro = (a*2)+(b*2);
    data.fecha = new Date();
    res.status(200).send({data})
})