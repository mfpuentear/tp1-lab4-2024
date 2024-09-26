import express from "express";

const router = express.Router();

let perimetro = [
    { id: 1, a: 2, b: 3, resultado: 10 },
    // { id: 2, a: 6, b: 81, resultado: 87 },
    // { id: 5, a: 12, b: 55, resultado: 87 },
];
let perimetroMaxId = 0;

// GET /sumas
router.get("/", (req, res) => {
    res.send({ perimetro });
});

// GET /sumas/:id
router.get("/:id", (req, res) => {
    // Obtendo id de la ruta
    const id = req.params.id;

    // Busco la suma con id de la ruta
    const per = perimetro.find((per) => rep.id == id);

    // Devuelvo la suma encontrada
    res.send({ per });
});

// POST /sumas
router.post("/", (req, res) => {
    const { a, b } = req.body;
    const per = { id: ++perimetroMaxId, a, b, resultado: (a*2 + b*2), fecha: new Date() };
    perimetro.push(per);
    res.status(201).send({ per });
});

// PUT /sumas/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;

    const perModificada = { id, a, b, resultado: (a*2 + b*2), fecha: new Date() };

    // con map
    perimetro = perimetro.map((per) => (per.id === id ? perModificada : per));
    res.status(200).send({ per: perModificada });
});

// DELETE /sumas/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    perimetro = perimetro.filter((per) => per.id !== id);
    res.status(200).send({ id });
});

export default router;