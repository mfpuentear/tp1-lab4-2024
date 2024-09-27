import { useEffect } from "react"
import { useState } from "react"


function App() {
  const [listado, setListado] = useState([])
  const [listadoId, setListadoId] = useState(0)
  const [nombre, setNombre] = useState("")
  const [status, setStatus] = useState(false)

  const getListado = async () => {
    const response = await fetch("http://localhost:3000/tareas")
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
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, status }),
    })
  
    if (response.ok) {
      const { tarea } = await response.json()
      setListado([...listado, tarea])
      setNombre("")
      setStatus(false)
    }
  }

  const modificarTarea = (tarea) => {
    setListadoId(tarea.id)
    setNombre(tarea.nombre)
    setStatus(tarea.status)
  }

  const modificarTareaApi = async () => {
    const response = await fetch(`http://localhost:3000/tareas/${listadoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, status }),
    })
    if (response.ok) {
      const { tarea } = await response.json()
      setListado(listado.map((s) => (s.id == tarea.id ? tarea : s)))
      setNombre("")
      setStatus(false)
    }
  }

  const quitarTarea = async (id) => {
    if (confirm("¿Desea quitar la tarea?")) {
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setListado(listado.filter((tarea) => tarea.id !== id))
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
          <label htmlFor="status">Completada: </label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        {listadoId === 0 && <button type="submit">Agregar</button>}
    </form>
    {listadoId !== 0 && (
        <>
          <button onClick={() => modificarTareaApi()}>Modificar</button>
          <button
            onClick={() => {
              setListadoId(0)
              setNombre("")
              setStatus(false)
            }}
          >
            Cancelar
          </button>
        </>
      )}
      <ul>
        {listado.map((tarea) => (
          <li key={tarea.id}>
            {`${tarea.id}: Tarea: ${tarea.nombre}, Completada: ${(tarea.status == false ? "No" : "Si")}`}
            <button onClick={() => modificarTarea(tarea)} disabled={listadoId !== 0}>
              E
            </button>
            <button onClick={() => quitarTarea(tarea.id)} disabled={listadoId !== 0}>
              X
            </button>
          </li>
        ))}
      </ul> 

      <p>{`Tareas: ${listado.length} - Completadas: ${listado.filter((tarea) => tarea.status).length} - No completadas: ${listado.filter((tarea) => !tarea.status).length}`}</p>
    </>
  )
}

export default App
