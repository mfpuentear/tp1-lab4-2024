import express from "express"

const router = express.Router();

let verduras = [
  { id: 1, nombre: "acelga", precio: 5 },
  { id: 2, nombre: "batata", precio: 10},
  { id: 3, nombre: "lechuga", precio: 55},
];
let verdurasMaxId = verduras.length;

router.get("/", (req, res) => {
  res.send({ verduras });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const verdura = verduras.find((verdura) => verdura.id == id);

  res.send({ verdura });
});

router.post("/", (req, res) => {
  const nombre = req.body.nombre;
  const precio = parseInt(req.body.precio);

  const existeVerdura = verduras.some((verdura)=>verdura.nombre == nombre)
  if (existeVerdura) {
    res.status(400).send({mensaje:"El nombre de la verdura ya existe"})
    return
  }
  if (precio <=0) {
    res.status(400).send({mensaje:"El precio debe ser mayor a 0"})
    return
  }
  const verdura = { id: ++verdurasMaxId, nombre, precio, fecha: new Date() };
  verduras.push(verdura);
  res.status(201).send({ verdura });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;
  
  const existeVerdura = verduras.some((verdura)=>verdura.nombre == nombre)
  if (existeVerdura) {
    res.status(400).send({mensaje:"El nombre de la verdura ya existe"})
    return
  }
  if (precio <=0) {
    res.status(400).send({mensaje:"El precio debe ser mayor a 0"})
    return
  }
  
  const verduraModificada = { id, nombre, precio, fecha: new Date()};
  
  verduras = verduras.map((verdura) => (verdura.id === id ? verduraModificada : verdura));
  res.status(200).send({ verdura: verduraModificada });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  verduras = verduras.filter((verdura) => verdura.id !== id);
  res.status(200).send({ id });
});

export default router;