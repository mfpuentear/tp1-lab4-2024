import express from "express";

const router = express.Router();

let superficie = [
    { id: 1, a: 2, b: 3, resultado: 6 },];
let superficieMaxId = 0;


router.get("/", (req, res) => {
    res.send({ superficie });
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sup = superficie.find((sup) => rep.id == id);
    res.send({ sup });
});


router.post("/", (req, res) => {
    const { a, b } = req.body;
    const sup = { id: ++superficieMaxId, 
        a, 
        b, 
        resultado: a*b,
        cuadrado: a == b ? "Cuadrado" : "Rectangulo" , 
        fecha: new Date() };
    superficie.push(sup);
    res.status(201).send({ sup });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    const supModificada = { id, a, b, resultado: a*b, fecha: new Date() };

    superficie = superficie.map((sup) => (sup.id === id ? supModificada : sup));
    res.status(200).send({ sup: supModificada });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    superficie = superficie.filter((sup) => sup.id !== id);
    res.status(200).send({ id });
});

export default router;