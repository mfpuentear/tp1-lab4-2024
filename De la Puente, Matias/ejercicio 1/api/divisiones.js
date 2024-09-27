import express from "express";

const DivisionesRouter = express.Router();

let divisiones = [];
let divisionesMaxId = 0;

// GET /divisiones
DivisionesRouter.get("/", (req, res) => {
    res.send({  divisiones });
});

// GET /divisiones/:id
DivisionesRouter.get("/:id", (req, res) => {
    // Obtendo id de la ruta
    const id = req.params.id;

    // Busco la suma con id de la ruta
    const division = divisiones.find((division) => division.id == id);

    // Devuelvo la suma encontrada
    res.send({  division });
});

// POST /divisiones
DivisionesRouter.post("/", (req, res) => {
    // Obtengo a y b
    const { a, b } = req.body;

    // Verifico que b sea distinto de 0
    if (b === 0) {
        res.status(400).send({ mensaje: "Division por cero" });
        return;
    }

    // Creo objeto division y lo agrego al arreglo y al cliente
    const division = {
        id: ++divisionesMaxId,
        a,
        b,
        resultado: a / b,
        fecha: new Date(),
    };
    divisiones.push(division);
    res.status(201).send({  division });
});

DivisionesRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;

    const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() };
    
    divisiones = divisiones.map((division) => (division.id === id ? divisionModificada : division));
    res.status(200).send({ division: divisionModificada });
});

DivisionesRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    divisiones = divisiones.filter((division) => division.id !== id);
    res.status(200).send({ id });
});
export default DivisionesRouter;