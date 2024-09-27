// Area: Base por altura
import express from "express";

export const areaRouter = express.Router()

let calculos = [];
let calcMaxID = 0;

areaRouter.get("/", (req, res) => {
    res.send({ calculos });
});

areaRouter.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const area = calculos.find((calculo)=> calculo.id == id)
         if (area){
            res.send({ area })
        }else{
            res.status(404).send({error: "Cálculo no encontrado."})
        }
})

areaRouter.post("/",(req,res)=>{
    const {a, b} = req.body;
    const data = {id: ++calcMaxID, base: a, altura: b, area: (a*b), fecha: new Date()}
    calculos.push(data)
    res.status(201).send({data})
})

areaRouter.delete("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    calculos = calculos.filter((calculo)=> calculo.id !== id)
    res.status(200).send(calculos)
})

areaRouter.put("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const {a,b} = req.body
    const data = calculos.find((area)=>area.id == id)
    if (!data){
        return res.status(404).send({ error: "Cálculo no encontrado." })
    }
    data.base = a;
    data.altura = b;
    data.area = (a*b);
    data.fecha = new Date();
    res.status(200).send({data})
})