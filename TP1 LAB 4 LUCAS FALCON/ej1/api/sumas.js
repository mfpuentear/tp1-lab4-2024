import express from "express"

const router = express.Router();

let sumas = [
  { id: 1, a: 2, b: 5, resultado: 7 },
  { id: 2, a: 6, b: 81, resultado: 87 },
  { id: 3, a: 12, b: 55, resultado: 87 },
];
let sumasMaxId = sumas.length;


router.get("/", (req, res) => {
  res.send({ sumas });
});


router.get("/:id", (req, res) => {
  
  const id = req.params.id;


  const suma = sumas.find((suma) => suma.id == id);

  
  res.send({ suma });
});


router.post("/", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const suma = { id: ++sumasMaxId, a, b, resultado: a + b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ suma });
});


router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;
 
  const sumaModificada = { id, a, b, resultado: a + b, fecha: new Date() };
  
  sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
  res.status(200).send({ suma: sumaModificada });
});


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});

export default router;