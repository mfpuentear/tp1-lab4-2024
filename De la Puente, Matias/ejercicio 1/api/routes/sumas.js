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
    if(a == null || b == null){
        return res.status(400).send({error: "Debe llenar los campos correspondientes"});
    }
    const suma = {id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date()};
    sumas.push(suma);
    return res.status(201).send({suma});
})

router.put("/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    // con find
    // const suma = sumas.find((suma) => suma.id == id);
    // suma.a = a;
    // suma.b = b;
    // suma.resultado = a + b;
    // suma.fecha = new Date();

    const sumaModificada = { id, a, b, resultado: a + b, fecha: new Date() }

    // con forEach
    /*
    sumas.forEach((suma, index) => {
        if (suma.id === id) {
        sumas[index] = sumaModificada;
        }
    });
    */

    // con map()
    sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
    return res.status(200).send({suma: sumaModificada});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    sumas = sumas.filter(suma => suma.id !=id);
    return res.status(200).send({id})
})