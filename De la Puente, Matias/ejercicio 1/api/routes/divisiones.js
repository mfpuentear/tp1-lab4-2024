import express from "express";
const router = express.Router();

const divisiones = [
  // { id: 1, a: 2, b: 2, resultado: 1 },
  // { id: 2, a: 4, b: 3, resultado: 0.75 },
];

let divisionesMaxId = 0;

router.get("/", (req, res) => {
    return res.send({ data: divisiones });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const division = divisiones.find((division) => division.id == id);
    if(division){
        return res.send({ data: division });
    }else{
        return res.status(404).send({error: `No se encontro una division con el id ${id}`})
    }

});

router.post("/", (req, res) => {
    const { a, b } = req.body;

    if (b === 0) {
        return res.status(400).send({ mensaje: "Division por cero" });
    }

    const division = {
        id: ++divisionesMaxId,
        a,
        b,
        resultado: a / b,
        fecha: new Date(),
    };
    divisiones.push(division);
    return res.status(201).send({division});
});

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    divisiones = divisiones.filter(division => division.id !=id);
    return res.status(200).send({id})
})

export default router;
