import express from "express";

const router = express.Router();

let divisiones = [
    { id: 1, a: 2, b: 2, resultado: 1 },
    { id: 2, a: 4, b: 3, resultado: 0.75 },
    { id: 3, a: 10, b: 2, resultado: 5 },

];
let divisionesMaxId = divisiones.length;

router.get("/", (req, res) => {
  res.send({ divisiones });
});


router.get("/:id", (req, res) => {
  
  const id = req.params.id;

  
  const division = divisiones.find((division) => division.id == id);

  
  res.send({ division });
});


router.post("/", (req, res) => {
  
  const { a, b } = req.body;

  
  if (b === 0) {
    res.status(400).send({ mensaje: "Division por cero" });
    return;
  }

 
  const division = {
    id: ++divisionesMaxId,
    a,
    b,
    resultado: a / b,
    fecha: new Date(),
  };
  divisiones.push(division);
  res.status(201).send({ division });
});


router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { a, b } = req.body;
    if (b === 0) {
        res.status(400).send({ mensaje: "Division por cero" });
        return;
      }
    const divisionModificada = { id, a, b, resultado: a / b, fecha: new Date() };
   
    divisiones = divisiones.map((division) => (division.id === id ? divisionModificada : division));
    res.status(200).send({ division: divisionModificada });
  });



router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    divisiones = divisiones.filter((division) => division.id !== id);
    res.status(200).send({ id });
  });

export default router