import express from "express"

export const notasRouter = express.Router()

let lista = []
let idAlumno = 0

notasRouter.get("/",(req,res)=>{
    res.send(lista)
})

notasRouter.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const item = lista.find((item)=>item.id===id)

    if (item){
        res.send(item)
    }
    else{
        res.status(404).send("Alumno no encontrado")
    }
})

notasRouter.post("/",(req,res)=>{
    const {nombre,nota1,nota2,nota3}=req.body
    
    if (lista.find((item)=>item.nombre==nombre)){
        return res.send("No se pueden repetir alumnos en el listado")
    }
   
    if (nombre!="" && nota1>0 && nota2>0 && nota3>0){
        const alumno= {
            id:++idAlumno,
            nombre,
            nota1,nota2,nota3}

        lista.push(alumno)
        res.status(200).send(alumno)
    }
    else{
        res.status(400).send("Todos los campos deben estar llenos")
    }
        

    }
)

notasRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    
    if (lista.find((item)=>item.id===id)){
        lista = lista.filter((item)=>item.id!==id)
        res.send("Alumno eliminado")
    }
    else{
        res.status(404).send("Alumno no encontrado")
    }
})

notasRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {nombre,nota1,nota2,nota3}= req.body

    if (lista.find((item)=>item.id===id)){
        if (!lista.find((item)=>item.nombre==nombre && item.id !==id)){
            const alumnoModificado = {id,nombre,nota1,nota2,nota3}
            lista = lista.map((item)=>item.id ===id ? alumnoModificado : item)
            res.send(alumnoModificado)
        }
        else{
            return res.status(404).send("El alumno ya existe")
        }
    }
    else{
        res.status(404).send("Alumno no encontrado")
    }
})