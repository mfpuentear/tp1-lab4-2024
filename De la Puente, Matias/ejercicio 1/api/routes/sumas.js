import express from "express";
export let router = express.Router();

let sumas = [
    // {id: 1, a: 2, b: 5, resultado: 7},
    // {id: 2, a: 6, b: 81, resultado: 87},
    // {id: 3, a: 35, b: 25, resultado: 60}
]

let sumasMaxId = 0;

router.get("/", (req, res) => {
    return res.send({sumas})
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const suma = sumas.find((suma) => suma.id == id);
    if(suma){
        return res.send({suma});
    }else{
        return res.status(404).send({error: `No se encontro una suma con el id ${id}`}) 
    }
})

router.post("/", (req, res) => {
    const {a, b} = req.body;
    const suma = {id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date()};
    sumas.push(suma);
    return res.status(201).send({suma});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    sumas = sumas.filter(suma => suma.id !=id);
    return res.status(200).send({id})
})