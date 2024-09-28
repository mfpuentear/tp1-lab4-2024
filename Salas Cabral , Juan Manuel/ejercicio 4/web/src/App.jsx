import { useEffect, useState } from "react"

function App() {
  const [alumnos, setAlumnos] = useState([])
  const [nombre, setNombre] = useState("")
  const [notauno, setnotauno] = useState(0)
  const [notados, setnotados] = useState(0)
  const [notatres, setnotatres] = useState(0)
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

  const agregarlo = async () => {
    const res = await fetch("http://localhost:3000/api/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        notas: [notauno, notados, notatres],
      }),
    })

    if (res.ok) {
      const alumnon = await res.json()
      if (alumnon.error) {
        alert(alumnon.error)
        return
      }
      console.log(alumnon)
      setAlumnos([...alumnos, alumnon])
      limpiar()
    }
  }

  const editarlo = (alumno) => {
    setEditando(alumno)
    setNombre(alumno.nombre)
    setnotauno(alumno.notas[0])
    setnotados(alumno.notas[1])
    setnotatres(alumno.notas[2])
  }
  const guardarlo = async () => {
    const res = await fetch(
      `http://localhost:3000/api/alumnos/${editando.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          notas: [notauno, notados, notatres],
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
  const eliminarlo = async (alumno) => {
    const res = await fetch(`http://localhost:3000/api/alumnos/${alumno.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setAlumnos(alumnos.filter((a) => a.id !== alumno.id))
    }
  }

  const limpiar = () => {
    setNombre("")
    setnotauno(0)
    setnotados(0)
    setnotatres(0)
    setEditando(null)
  }
  return (
    <>
      <form>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <p>Notas:</p>
        <div>
          <div>
            <label htmlFor="notas">Primera nota: </label>
            <input type="number" value={notauno} onChange={(e) => setnotauno(parseFloat(e.target.value))}/>
          </div>
          <div>
            <label htmlFor="notas">Segunda nota: </label>
            <input type="number" value={notados} onChange={(e) => setnotados(parseFloat(e.target.value))}/>
          </div>
          <div>
            <label htmlFor="notas">Tercera nota: </label>
            <input type="number" value={notatres} onChange={(e) => setnotatres(parseFloat(e.target.value))}/>
          </div>
        </div>
        {!editando && (<button type="button" onClick={agregarlo}>Agregar</button>)}
        {editando && (<button type="button" onClick={guardarlo}>Guardar</button>)}
        <button type="button" onClick={limpiar}>Cancelar</button>
      </form>
      <ul>
        {alumnos.map((a) => (
          <li key={a.id}>
            {a.nombre} - Notas: {a.notas[0]}, {a.notas[1]}, {a.notas[2]} -
            Promedio: {a.promedio} 
            <button onClick={() => editarlo(a)}>Editar</button>
            <button onClick={() => eliminarlo(a)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  )
}
export default App
