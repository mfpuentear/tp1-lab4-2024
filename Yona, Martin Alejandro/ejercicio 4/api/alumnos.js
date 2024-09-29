import express from "express"

export const alumnosRouter = express.Router()

let alumnos = [
    {id:1,nombre:"Matias Salinas",notas:[10,10,10]}

]
alumnosRouter.get('/', (req, res)=>{
    res.status(200).send({data:alumnos})
})

alumnosRouter.post('/', (req, res) => {
    const id = (alumnos.length < 1) ? 1 : parseInt(alumnos[alumnos.length-1].id) + 1;
    const { nombre , notas } = req.body
    const nombreRepetido = alumnos.find((alumno)=>alumno.nombre == nombre)
    
    for (let nota of notas){
        if (nota < 0 || nota > 10){
            return res.status(400).send('No pueden haber notas negativas ni mayores a 10')
        }
    }

    if (!nombreRepetido){
        const nuevoAlumno = { id, nombre, notas}
        alumnos.push(nuevoAlumno)
        return res.status(201).send({data:nuevoAlumno})
    }else{
        return res.status(400).send('Ya existe un alumno con ese nombre')
    }
})

alumnosRouter.put('/:id', (req, res)=>{
    const { id } = req.params
    const { nombre , notas } = req.body

    for (let nota of notas){
        if (nota < 0 || nota > 10){
            return res.status(400).send('No pueden haber notas negativas ni mayores a 10')
        }
    }
    
    const nombreRepetido = alumnos.find((alumno)=>alumno.nombre == nombre && alumno.id != id)
    if (!nombreRepetido){
        const nuevoAlumno = { id, nombre, notas}
        alumnos = alumnos.map((alumno) => (alumno.id == nuevoAlumno.id) ? nuevoAlumno : alumno)
        return res.status(200).send({data:nuevoAlumno})
    }else{
        return res.status(400).send('Ya existe un alumno con ese nombre')
    }
})

alumnosRouter.delete('/:id', (req , res) =>{
    const { id } = req.params
    alumnos = alumnos.filter((alumno)=> alumno.id != id)
    res.status(200).send('Alumno Borrado')
})
