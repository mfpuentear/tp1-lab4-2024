import express from "express";
const router = express.Router();

let multiplicaciones = [
    // {id: 1, a: 2, b: 5, resultado: 10},
    // {id: 2, a: 6, b: 8, resultado: 48},
    // {id: 3, a: 35, b: 25, resultado: 875}
]

let multiplicacionesMaxId = 0;

router.get("/", (req, res) => {
    return res.send({multiplicaciones})
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);
    if(multiplicacion){
        return res.send({multiplicacion});
    }else{
        return res.status(404).send({error: `No se encontro una multiplicacion con el id ${id}`}) 
    }
})

router.post("/", (req, res) => {
    const {a, b} = req.body;
    if(a == null || b == null){
        return res.status(400).send({error: "Debe llenar los campos correspondientes"});
    }
    const multiplicacion = {id: ++multiplicacionesMaxId, a, b, resultado: a * b, fecha: new Date()};
    multiplicaciones.push(multiplicacion);
    return res.status(201).send({multiplicacion});
})

router.put("/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    // con find
    // const multiplicacion = multiplicaciones.find((multiplicacion) => multiplicacion.id == id);
    // multiplicacion.a = a;
    // multiplicacion.b = b;
    // multiplicacion.resultado = a + b;
    // multiplicacion.fecha = new Date();

    const multiplicacionModificada = { id, a, b, resultado: a * b, fecha: new Date() }

    // con forEach
    
    // multiplicaciones.forEach((multiplicacion, index) => {
    //     if (multiplicacion.id === id) {
    //         multiplicaciones[index] = multiplicacionModificada;
    //     }
    // });
    

    // con map()
    multiplicaciones = multiplicaciones.map((multiplicacion) => (multiplicacion.id === id ? multiplicacionModificada : multiplicacion));
    return res.status(200).send({multiplicacion: multiplicacionModificada});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    multiplicaciones = multiplicaciones.filter(multiplicacion => multiplicacion.id !=id);
    return res.status(200).send({id})
})

export default router;