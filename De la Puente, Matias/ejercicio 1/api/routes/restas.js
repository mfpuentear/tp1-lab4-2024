import express from "express";
const router = express.Router();

let restas = [
    // {id: 1, a: 2, b: 5, resultado: -3},
    // {id: 2, a: 8, b: 6, resultado: 2},
    // {id: 3, a: 25, b: 35, resultado: 10}
]

let restasMaxId = 0;

router.get("/", (req, res) => {
    return res.send({restas})
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const resta = restas.find((resta) => resta.id == id);
    if(resta){
        return res.send({resta});
    }else{
        return res.status(404).send({error: `No se encontro una resta con el id ${id}`}) 
    }
})

router.post("/", (req, res) => {
    const {a, b} = req.body;
    if(a == null || b == null){
        return res.status(400).send({error: "Debe llenar los campos correspondientes"});
    }
    const resta = {id: ++restasMaxId, a, b, resultado: a - b, fecha: new Date()};
    restas.push(resta);
    return res.status(201).send({resta});
})

router.put("/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    // con find
    // const resta = restas.find((resta) => resta.id == id);
    // resta.a = a;
    // resta.b = b;
    // resta.resultado = a + b;
    // resta.fecha = new Date();

    const restaModificada = { id, a, b, resultado: a - b, fecha: new Date() }

    // con forEach
    
    // restas.forEach((resta, index) => {
    //     if (resta.id === id) {
    //         restas[index] = restaModificada;
    //     }
    // });
    

    // con map()
    restas = restas.map((resta) => (resta.id === id ? restaModificada : resta));
    return res.status(200).send({resta: restaModificada});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    restas = restas.filter(resta => resta.id !=id);
    return res.status(200).send({id})
})

export default router;