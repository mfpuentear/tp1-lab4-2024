import express from "express";

const router = express.Router();

let productos = [{ id: 0, producto: "zanahoria", precio: 2000},];
let productosMaxId = 0;

router.get("/", (req, res) => {
    res.send({ productos });
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    const produc = productos.find((produc) => produc.id == id);
    res.send({ produc });
});

router.post("/", (req, res) => {
    const { producto, precio } = req.body;
    const existe = productos.some((produc) => produc.producto === producto);
    if (existe) {
    return res.status(400).send({ mensaje: "No se puede agregar el mismo producto" });
    }
    if (precio <= 0) {
    return res.status(400).send({ mensaje: "El precio debe ser positivo" });
    }
    const produc = { id: ++productosMaxId, producto, precio, fecha: new Date() };
    productos.push(produc);
    res.status(201).send({ produc });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { producto, precio } = req.body;
    const producModificada = { id, producto, precio, fecha: new Date() };

    productos = productos.map((produc) => (produc.id === id ? producModificada : produc));
    res.status(200).send({ produc: producModificada });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter((produc) => produc.id !== id);
    res.status(200).send({ id });
});

export default router;