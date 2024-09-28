import { useState, useEffect } from "react"

function App() {
  const [listado, setListado] = useState([])
  const [listadoId, setListadoId] = useState(0)
  const [nombre, setNombre] = useState("")
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)

  const getListado = async () => {
    const response = await fetch("http://localhost:3000/alumnos")
    if (response.ok) {
      const { listado } = await response.json()
      setListado(listado)
    }
  }

  useEffect(() => {
    getListado()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/alumnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, a, b, c }),
    })
  
    if (response.ok) {
      const { alumno } = await response.json()
      setListado([...listado, alumno])
      setNombre("")
      setA(0)
      setB(0)
      setC(0)
    }
  }
  
  const modificarAlumno = (alumno) => {
    setListadoId(alumno.id)
    setNombre(alumno.nombre)
    setA(alumno.a)
    setB(alumno.b)
    setC(alumno.c)
  }

  const modificarAlumnoApi = async () => {
    const response = await fetch(`http://localhost:3000/alumnos/${listadoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, a, b, c }),
    })
    if (response.ok) {
      const { alumno } = await response.json()
      setListado(listado.map((s) => (s.id == alumno.id ? alumno : s)))
      setNombre("")
      setA(0)
      setB(0)
      setC(0)
    }
  }


  const quitarAlumno = async (id) => {
    if (confirm("¿Desea borrar el alumno?")) {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setListado(listado.filter((alumno) => alumno.id !== id))
      }
    }
  }

  return (
    <>
    <h2>Ejercicio 4</h2>
    <h3>Alumnos</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="a">Nota 1: </label>
          <input
            type="number"
            id="a"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="b">Nota 2: </label>
          <input
            type="number"
            id="b"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="c">Nota 3: </label>
          <input
            type="number"
            id="c"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value))}
          />
        </div>
        {listadoId === 0 && <button type="submit">Agregar</button>}
      </form>
      {listadoId !== 0 && (
        <>
          <button onClick={() => modificarAlumnoApi()}>Modificar</button>
          <button
            onClick={() => {
              setListadoId(0)
              setNombre("")
              setA(0)
              setB(0)
              setC(0)
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {listado.map((alumno) => (
          <li key={alumno.id}>
            {`${alumno.id}: Nombre: ${alumno.nombre}, Nota 1: ${alumno.a} => Nota 2: ${alumno.b}, Nota 3: ${alumno.c}, Promedio: ${alumno.promedio} ${(alumno.promedio >= 6 && alumno.promedio < 8 ? "(Aprobado)" : alumno.promedio > 8 ? "(Promocionado)" : "(Reprobado)")}`}
            <button onClick={() => modificarAlumno(alumno)} disabled={listadoId !== 0}>
              E
            </button>
            <button onClick={() => quitarAlumno(alumno.id)} disabled={listadoId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul> 
    </>
  )
}

export default App