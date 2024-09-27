import express from "express";
const router = express.Router();

let rectangulos = [
    // {id: 1, base: 4, altura: 6, perimetro: 20, superficie: 24}
];
let maxId = 0;

router.get("/", (req, res)=>{
    res.json({rectangulos});
})

router.get("/:id", (req, res)=>{
    const { id } = req.params;
    const rectangulo = rectangulos.find((rectangulo) => rectangulo.id == id);
    if(rectangulo){
        return res.json({rectangulo});
    }else{
        return res.status(404).json({error: `No se encontro un rectangulo con el id ${id}`}) 
    }
})

router.post("/", (req, res)=>{
    const {base, altura} = req.body;
    if(base == null || altura == null){
        return res.status(400).json({error: "Debe llenar los campos numericos correspondientes"});
    }
    if(base <= 0 || altura <= 0){
        return res.status(400).json({error: "No puede ingresar numeros menores o iguales a 0"});
    }
    const perimetro = 2 * (base + altura);
    const superficie = base * altura;
    const rectangulo = {id: ++maxId, base, altura, perimetro, superficie};
    rectangulos.push(rectangulo);
    res.status(201).json({rectangulo});
})

router.put("/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const {base, altura} = req.body;
    if(base == null || altura == null){
        return res.status(400).json({error: "Debe llenar los campos numericos correspondientes"});
    }
    if(base <= 0 || altura <= 0){
        return res.status(400).json({error: "No puede ingresar numeros menores o iguales a 0"});
    }
    const rectanguloActualizado = {id, base, altura, perimetro: 2 * (base + altura), superficie: base * altura};
    rectangulos = rectangulos.map((rectangulo) => rectangulo.id == id ? rectanguloActualizado : rectangulo);
    return res.status(201).json({rectangulo: rectanguloActualizado});
})

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    rectangulos = rectangulos.filter((rectangulo) => rectangulo.id != id);
    return res.status(200).json({id});
})
















export default router;