import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [alumnos, setAlumnos] = useState([])
  const [nombre, setNombre] = useState("")
  const [nota1, setNota1] = useState(0)
  const [nota2, setNota2] = useState(0)
  const [nota3, setNota3] = useState(0)
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    const fetchAlumnos = async () => {
      const res = await fetch("http://localhost:3000/api/alumnos")

      if (res.ok) {
        const lista = await res.json()
        if (lista.error) {
          alert(lista.error)
        }
        setAlumnos(lista)
      }
    }
    fetchAlumnos()
  }, [])

  const AgregarAlumno = async () => {
    const res = await fetch("http://localhost:3000/api/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        notas: [nota1, nota2, nota3],
      }),
    })

    if (res.ok) {
      const nuevoAlumno = await res.json()
      if (nuevoAlumno.error) {
        alert(nuevoAlumno.error)
        return
      }
      console.log(nuevoAlumno)
      setAlumnos([...alumnos, nuevoAlumno])
      limpiar()
    }
  }

  const EditarAlumno = (alumno) => {
    setEditando(alumno)
    setNombre(alumno.nombre)
    setNota1(alumno.notas[0])
    setNota2(alumno.notas[1])
    setNota3(alumno.notas[2])
  }

  const GuardarAlumno = async () => {
    const res = await fetch(
      `http://localhost:3000/api/alumnos/${editando.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          notas: [nota1, nota2, nota3],
        }),
      }
    )

    if (res.ok) {
      const alumno = await res.json()
      if (alumno.error) {
        alert(alumno.error)
        return
      }
      setAlumnos(alumnos.map((a) => (a.id === alumno.id ? alumno : a)))
      limpiar()
    }
  }

  const EliminarAlumno = async (alumno) => {
    const res = await fetch(`http://localhost:3000/api/alumnos/${alumno.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setAlumnos(alumnos.filter((a) => a.id !== alumno.id))
    }
  }

  const limpiar = () => {
    setNombre("")
    setNota1(0)
    setNota2(0)
    setNota3(0)
    setEditando(null)
  }
  return (
    <>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <p>Notas:</p>
        <div>
          <div>
            <label htmlFor="notas">Nota1: </label>
            <input
              type="number"
              value={nota1}
              onChange={(e) => setNota1(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="notas">Nota2: </label>
            <input
              type="number"
              value={nota2}
              onChange={(e) => setNota2(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="notas">Nota3: </label>
            <input
              type="number"
              value={nota3}
              onChange={(e) => setNota3(parseFloat(e.target.value))}
            />
          </div>
        </div>
        {!editando && (
          <button type="button" onClick={AgregarAlumno}>
            Agregar
          </button>
        )}
        {editando && (
          <button type="button" onClick={GuardarAlumno}>
            Guardar
          </button>
        )}
        <button type="button" onClick={limpiar}>
          Cancelar
        </button>

      <ul>
        {alumnos.map((alum) => (
          <li key={alum.id}>
            {alum.nombre} - Notas: {alum.notas[0]}, {alum.notas[1]}, {alum.notas[2]} -
            Promedio: {alum.promedio} 
            <button onClick={() => EditarAlumno(alum)}>Modificar</button>
            <button onClick={() => EliminarAlumno(alum)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App