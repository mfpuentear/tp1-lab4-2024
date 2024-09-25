import express from "express";
const router = express.Router();

let rectangulos = [
    // {id: 1, lado1: 4, lado2: 6, perimetro: 20, superficie: 24}
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
    const {lado1, lado2} = req.body;
    if(lado1 == null || lado2 == null){
        return res.status(400).json({error: "Debe llenar los campos numericos correspondientes"});
    }
    const perimetro = 2 * (lado1 + lado2);
    const superficie = lado1 * lado2;
    const rectangulo = {id: ++maxId, lado1, lado2, perimetro, superficie};
    rectangulos.push(rectangulo);
    res.status(201).json({rectangulo});
})
















export default router;