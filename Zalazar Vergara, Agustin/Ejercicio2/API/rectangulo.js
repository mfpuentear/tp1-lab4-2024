import express from "express";
const router = express.Router();

let rectangulos = [];
let maxId = 0;

router.get("/", (req, res)=>{
    res.send({rectangulos});
})

router.get("/:id", (req, res)=>{
    const { id } = req.params;
    const rectangulo = rectangulos.find((rectangulo) => rectangulo.id == id);
    if(rectangulo){
        return res.send({rectangulo});
    }else{
        return res.status(404).send({error: `No se encontro un rectangulo con el id ${id}`}) 
    }
})

router.post("/", (req, res)=>{
    const {base, altura} = req.body;
    if(base == null || altura == null){
        return res.status(400).send({error: "Debe llenar los campos numericos correspondientes"});
    }
    if(base <= 0 || altura <= 0){
        return res.status(400).send({error: "No puede ingresar numeros menores o iguales a 0"});
    }
    const perimetro = 2 * (base + altura);
    const superficie = base * altura;
    const rectangulo = {id: ++maxId, base, altura, perimetro, superficie};
    rectangulos.push(rectangulo);
    res.status(201).send({rectangulo});
})

router.put("/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const {base, altura} = req.body;
    if(base == null || altura == null){
        return res.status(400).send({error: "Debe llenar los campos numericos correspondientes"});
    }
    if(base <= 0 || altura <= 0){
        return res.status(400).send({error: "No puede ingresar numeros menores o iguales a 0"});
    }
    const rectanguloActualizado = {id, base, altura, perimetro: 2 * (base + altura), superficie: base * altura};
    rectangulos = rectangulos.map((rectangulo) => rectangulo.id == id ? rectanguloActualizado : rectangulo);
    return res.status(201).send({rectangulo: rectanguloActualizado});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    rectangulos = rectangulos.filter((rectangulo) => rectangulo.id != id);
    return res.status(200).send({id});
})

export default router;