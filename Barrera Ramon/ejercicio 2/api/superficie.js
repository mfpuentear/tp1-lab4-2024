import express from "express";

const router = express.Router();

let superficie = [
    { id: 1, a: 2, b: 3, resultado: 6 },
    // { id: 2, a: 6, b: 81, resultado: 87 },
    // { id: 5, a: 12, b: 55, resultado: 87 },
];
let superficieMaxId = 0;

// GET /sumas
router.get("/", (req, res) => {
    res.send({ superficie });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
    // Obtendo id de la ruta
    const id = req.params.id;

    // Busco la suma con id de la ruta
    const sup = superficie.find((sup) => rep.id == id);

    // Devuelvo la suma encontrada
    res.send({ sup });
});

// POST /sumas
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

// PUT /sumas/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;

    const supModificada = { id, a, b, resultado: a*b, fecha: new Date() };

    // con map
    superficie = superficie.map((sup) => (sup.id === id ? supModificada : sup));
    res.status(200).send({ sup: supModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    superficie = superficie.filter((sup) => sup.id !== id);
    res.status(200).send({ id });
});

export default router;