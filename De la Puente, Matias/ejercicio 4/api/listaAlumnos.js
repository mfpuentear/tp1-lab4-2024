import { Router } from 'express';

export const listaRouter = Router();

let lista = [];
let alumnoMaxID = 0;

listaRouter.get("/", (req,res)=>{
    res.send({ lista });
})

listaRouter.get("/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const data = lista.find((a)=> a.id == id)
    if(!data){
        return res.status(404).send({ error: "Alumno no encontrado. "})
    }
    res.send({ data })
})

listaRouter.post("/", (req,res)=>{
    const { alumno, n1, n2, n3} = req.body
    if(n1 < 0 || n2 < 0 || n3 < 0){
        return res.status(400).send({ error: "Las notas deben ser igual o mayor a 0." })
    }
    if(lista.some((a)=>alumno == a.alumno)){
        return res.status(409).send({ error: "Alumno ya existente." })
    }
    const data = { id: ++alumnoMaxID, alumno: alumno, n1: n1, n2: n2, n3: n3, fecha: new Date()};
    lista.push(data);
    res.send({ lista });
})

listaRouter.delete("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    lista = lista.filter((a)=>a.id !== id)
    res.status(200).send({ lista })
})

listaRouter.put("/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const { alumno, n1, n2, n3 } = req.body;
    if (n1 < 0 || n2 < 0 || n3 < 0) {
        return res.status(400).send({ error: "Las notas deben ser igual o mayor a 0." });
    }

    const data = lista.find((a) => a.id == id);
    if (!data) {
        return res.status(404).send({ error: "Alumno no encontrado." });
    }

    if (lista.some((a) => a.alumno === alumno && a.id !== id)) {
        return res.status(409).send({ error: "El alumno ya existe." });
    }
    data.alumno = alumno;
    data.n1 = n1;
    data.n2 = n2;
    data.n3 = n3;
    res.send({ data })
})