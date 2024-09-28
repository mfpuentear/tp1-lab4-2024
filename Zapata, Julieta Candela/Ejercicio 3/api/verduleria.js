import express from "express";

const router = express.Router();

let productos = [];
let productosMaxId = 0;

// GET /productos
router.get("/", (req, res) => {
  res.send({ productos });
});

// GET /productos/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((producto) => producto.id == id);
  res.send({ producto });
});

// POST /productos
router.post("/", (req, res) => {
  const { a, b } = req.body;
  
  if (b < 0) {
    res.status(400).send('ERROR')
    return;
  }
  if (productos.filter ( (e) => {
    if( e.a===a ) {
        return e
    } }) .length > 0 ) {
    res.status(400).send('ERROR')
    return;
  }
  const producto = { id: ++productosMaxId, a, b, fecha: new Date() };
  productos.push (producto);
  res.status(201).send({ producto });
});

// PUT /productos/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
  
  if ( b < 0 ) {
    res.status(400).send('ERROR')
    return;
  }
  
  if (productos.filter ( (e) => {
    if ( e.a===a && e.id!=id) {
        return e
    } }) .length > 0 ) {
    res.status(400).send('ERROR')
    return;
  }

  const productoModificado = { id, a, b, fecha: new Date() };
  productos = productos.map((producto) => (producto.id === id ? productoModificado : producto));
  res.status(200).send({ producto: productoModificado });
});

// DELETE /productos/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((producto) => producto.id !== id);
  res.status(200).send({ id });
});

export default router;