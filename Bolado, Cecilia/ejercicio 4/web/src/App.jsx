import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [alumnos, setAlumnos] = useState([])
  const [nombre, setNombre] = useState("")
  const [calificacion1, setCalificacion1] = useState(0)
  const [calificacion2, setCalificacion2] = useState(0)
  const [calificacion3, setCalificacion3] = useState(0)
  const [modificar, setModificar] = useState(null)

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await fetch("http://localhost:3000/alumnos")

      if (response.ok) {
        const lista = await response.json()
        if (lista.error) {
          alert(lista.error)
        }
        setAlumnos(lista)
      }
    }
    fetchAlumnos()
  }, [])

  const agregarAlumno = async () => {
    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        notas: [calificacion1, calificacion2, calificacion3],
      }),
    })

    if (response.ok) {
      const nuevoAlumno = await response.json()
      if (nuevoAlumno.error) {
        alert(nuevoAlumno.error)
        return
      }
      console.log(nuevoAlumno)
      setAlumnos([...alumnos, nuevoAlumno])
      limpiar()
    }
  }

  const editarAlumno = (alumno) => {
    setModificar(alumno)
    setNombre(alumno.nombre)
    setCalificacion1(alumno.notas[0])
    setCalificacion2(alumno.notas[1])
    setCalificacion3(alumno.notas[2])
  }

  const guardarAlumno = async () => {
    const response = await fetch(
      `http://localhost:3000/alumnos/${modificar.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          notas: [calificacion1, calificacion2, calificacion3],
        }),
      }
    )

    if (response.ok) {
      const alumno = await response.json()
      if (alumno.error) {
        alert(alumno.error)
        return
      }
      setAlumnos(alumnos.map((a) => (a.id === alumno.id ? alumno : a)))
      limpiar()
    }
  }

  const quitarAlumno = async (alumno) => {
    const response = await fetch(`http://localhost:3000/alumnos/${alumno.id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setAlumnos(alumnos.filter((a) => a.id !== alumno.id))
    }
  }

  const limpiar = () => {
    setNombre("")
    setCalificacion1(0)
    setCalificacion2(0)
    setCalificacion3(0)
    setModificar(null)
  }
  return (
    <>
      <form>
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
            <label htmlFor="notas">calificacion1: </label>
            <input
              type="number"
              value={calificacion1}
              onChange={(e) => setCalificacion1(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="notas">calificacion2: </label>
            <input
              type="number"
              value={calificacion2}
              onChange={(e) => setCalificacion2(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="notas">calificacion3: </label>
            <input
              type="number"
              value={calificacion3}
              onChange={(e) => setCalificacion3(parseFloat(e.target.value))}
            />
          </div>
        </div>
        {!modificar && (
          <button type="button" onClick={agregarAlumno}>
            Agregar
          </button>
        )}
        {modificar && (
          <button type="button" onClick={guardarAlumno}>
            Guardar
          </button>
        )}
        <button type="button" onClick={limpiar}>
          Cancelar
        </button>
      </form>
      <ul>
        {alumnos.map((a) => (
          <li key={a.id}>
            {a.nombre} - Notas: {a.notas[0]}, {a.notas[1]}, {a.notas[2]} -
            Promedio: {a.promedio} 
            <button onClick={() => editarAlumno(a)}>Editar</button>
            <button onClick={() => quitarAlumno(a)}>Quitar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App