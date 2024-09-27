import express from "express";

const router = express.Router();

let perimetro = [
    { id: 1, a: 2, b: 3, resultado: 10 },];
let perimetroMaxId = 0;

router.get("/", (req, res) => {
    res.send({ perimetro });
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    const per = perimetro.find((per) => rep.id == id);
    res.send({ per });
});


router.post("/", (req, res) => {
    const { a, b } = req.body;
    const per = { id: ++perimetroMaxId, a, b, resultado: (a*2 + b*2), fecha: new Date() };
    perimetro.push(per);
    res.status(201).send({ per });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    const perModificada = { id, a, b, resultado: (a*2 + b*2), fecha: new Date() };

    perimetro = perimetro.map((per) => (per.id === id ? perModificada : per));
    res.status(200).send({ per: perModificada });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    perimetro = perimetro.filter((per) => per.id !== id);
    res.status(200).send({ id });
});

export default router;