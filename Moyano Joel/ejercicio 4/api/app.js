import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

// Interpretar JSON en el body
app.use(express.json())

// Habilitamos CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
});



let alumnos = []

// Obtener todo
app.get('/alumnos', (req, res) => {
  res.json(alumnos)
})

// Agregar 
app.post('/alumnos', (req, res) => {
  const { nombre, nota1, nota2, nota3 } = req.body

  // Se verifican duplicados y notas positivas
  const alumnoExistente = alumnos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase())
  if (alumnoExistente) return res.status(400).json({ error: 'El alumno ya existe' })
  if (nota1 < 0 || nota2 < 0 || nota3 < 0) return res.status(400).json({ error: 'Las notas deben ser positivas' })

  const nuevoAlumno = { id: alumnos.length + 1, nombre, notas: [nota1, nota2, nota3] }
  alumnos.push(nuevoAlumno)
  res.status(201).json(nuevoAlumno)
})

// Modificar 
app.put('/alumnos/:id', (req, res) => {
  const { id } = req.params
  const { nombre, nota1, nota2, nota3 } = req.body

  const alumno = alumnos.find(a => a.id === parseInt(id))
  if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' })

  if (nota1 < 0 || nota2 < 0 || nota3 < 0) return res.status(400).json({ error: 'Las notas deben ser positivas' })
  const alumnoDuplicado = alumnos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase() && a.id !== alumno.id)
  if (alumnoDuplicado) return res.status(400).json({ error: 'Otro alumno con el mismo nombre ya existe' })

  alumno.nombre = nombre
  alumno.notas = [nota1, nota2, nota3]
  res.json(alumno)
})

// Eliminar 
app.delete('/alumnos/:id', (req, res) => {
  const { id } = req.params
  alumnos = alumnos.filter(a => a.id !== parseInt(id))
  res.status(204).send()
})



app.listen(port, () => {
    console.log(`La aplicación está funcionando en el puerto ${port}`)
});
