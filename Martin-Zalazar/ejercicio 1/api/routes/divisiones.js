import express from "express";
const router = express.Router();

let divisiones = [
  // { id: 1, a: 2, b: 2, resultado: 1 },
  // { id: 2, a: 4, b: 3, resultado: 0.75 },
];

let divisionesMaxId = 0;

router.get("/", (req, res) => {
    return res.json({ divisiones });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const division = divisiones.find((division) => division.id == id);
    if(division){
        return res.json({ division });
    }else{
        return res.status(204).json({error: `No se encontro una division con el id ${id}`})
    }

});

router.post("/", (req, res) => {
    const { a, b } = req.body;

    if (b === 0) {
        return res.status(400).json({ error: "No se puede dividir por cero" });
    }

    if(a == null || b == null){
        return res.status(400).json({error: "Debe llenar los campos correspondientes"});
    }

    const division = {
        id: ++divisionesMaxId,
        a,
        b,
        resultado: a / b,
        fecha: new Date(),
    };
    divisiones.push(division);
    return res.status(201).json({division});
});

router.put("/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    if (b === 0) {
        return res.status(400).json({ error: "No se puede dividir por cero" });
    }
    if(a == null || b == null){
        return res.status(400).json({error: "Debe llenar los campos correspondientes"});
    }
    // con find
    // const division = divisiones.find((division) => division.id == id);
    // division.a = a;
    // division.b = b;
    // division.resultado = a + b;
    // division.fecha = new Date();

    const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() }

    // con forEach
    
    // divisiones.forEach((division, index) => {
    //     if (division.id === id) {
    //         divisiones[index] = divisionModificada;
    //     }
    // });
    

    // con map()
    divisiones = divisiones.map((division) => (division.id === id ? divisionModificada : division));
    return res.status(200).json({division: divisionModificada});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    divisiones = divisiones.filter(division => division.id !=id);
    return res.status(200).json({id})
})

export default router;
