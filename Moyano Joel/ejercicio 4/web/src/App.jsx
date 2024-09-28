import { useEffect, useState } from 'react'

function App() {
  const [alumnos, setAlumnos] = useState([])
  const [nombre, setNombre] = useState('')
  const [notas, setNotas] = useState([0, 0, 0])
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const fetchAlumnos = async () => {
      const res = await fetch('http://localhost:3000/alumnos')
      const data = await res.json()
      setAlumnos(data)
    }
    fetchAlumnos()
  }, [])

  const agregarAlumno = async () => {
    const [nota1, nota2, nota3] = notas
    const res = await fetch('http://localhost:3000/alumnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    });
    if (res.ok) {
      const nuevoAlumno = await res.json()
      setAlumnos([...alumnos, nuevoAlumno])
      setNombre('')
      setNotas([0, 0, 0])
    }
  };

  const modificarAlumno = async () => {
    const [nota1, nota2, nota3] = notas
    const res = await fetch(`http://localhost:3000/alumnos/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, nota1, nota2, nota3 }),
    })
    if (res.ok) {
      const alumnoModificado = await res.json()
      setAlumnos(alumnos.map(a => (a.id === editId ? alumnoModificado : a)))
      setEditId(null)
      setNombre('')
      setNotas([0, 0, 0])
    }
  };

  const quitarAlumno = async (id) => {
    await fetch(`http://localhost:3000/alumnos/${id}`, { method: 'DELETE' })
    setAlumnos(alumnos.filter(a => a.id !== id))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    editId ? modificarAlumno() : agregarAlumno()
  };

  const editarAlumno = (alumno) => {
    setEditId(alumno.id)
    setNombre(alumno.nombre)
    setNotas(alumno.notas)
  }

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del alumno" />
        {notas.map((nota, index) => (
          <input key={index} type="number" value={nota} onChange={e => {
            const nuevasNotas = [...notas]
            nuevasNotas[index] = parseFloat(e.target.value)
            setNotas(nuevasNotas)
          }} placeholder={`Nota ${index + 1}`} />
        ))}
        <button type="submit">{editId ? 'Modificar' : 'Agregar'}</button>
      </form>

      <ul>
        {alumnos.map(alumno => {
          const promedio = alumno.notas.length > 0 ? (alumno.notas.reduce((a, b) => a + b, 0) / alumno.notas.length) : 0
          const estado = promedio >= 8 ? 'Promocionado' : (promedio >= 6 ? 'Aprobado' : 'Desaprobado')
          return (
            <li key={alumno.id}>
              {alumno.nombre} - Notas: {alumno.notas.join(', ')} - Promedio: {promedio.toFixed(2)} - Estado: {estado}
              <button onClick={() => editarAlumno(alumno)}>Editar</button>
              <button onClick={() => quitarAlumno(alumno.id)}>Eliminar</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
