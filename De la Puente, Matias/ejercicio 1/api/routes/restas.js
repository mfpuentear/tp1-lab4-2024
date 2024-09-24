import express from "express";
const router = express.Router();

const restas = [
    // {id: 1, a: 2, b: 5, resultado: -3},
    // {id: 2, a: 8, b: 6, resultado: 2},
    // {id: 3, a: 25, b: 35, resultado: 10}
]

let restasMaxId = 0;

router.get("/", (req, res) => {
    return res.send(restas)
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const resta = restas.find((resta) => resta.id == id);
    if(resta){
        return res.send(resta);
    }else{
        return res.status(404).send({error: `No se encontro una resta con el id ${id}`}) 
    }
})

router.post("/", (req, res) => {
    const {a, b} = req.body;
    const resta = {id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date()};
    restas.push(resta);
    return res.status(201).send(resta);
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    restas = restas.filter(resta => resta.id !=id);
    return res.status(200).send({id})
})

export default router;