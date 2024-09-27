import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [tareas, setTareas] = useState([])
  const [nombre, setNombre] = useState("")
  const [completado, setCompletado] = useState(false)
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    const fetchTareas = async () => {
      const res = await fetch("http://localhost:3000/api/tareas")
      if (res.ok) {
        const tareas = await res.json()
        setTareas(tareas)
      }
    }
    fetchTareas()
  })

  const agregarTarea = async () => {
    const res = await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        completado,
      }),
    })

    if (res.ok) {
      const tarea = await res.json()
      setTareas([...tareas, tarea])
      limpiar()
    }
  }

  const editarTarea = (tarea) => {
    setEditando(tarea)
    setNombre(tarea.nombre)
    setCompletado(tarea.completado)
  }

  const guardarTarea = async () => {
    const res = await fetch(`http://localhost:3000/api/tareas/${editando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        completado,
      }),
    })

    if (res.ok) {
      const index = tareas.findIndex((tarea) => tarea.id === editando.id)
      const tareasActualizadas = [...tareas]
      tareasActualizadas[index] = {
        ...tareasActualizadas[index],
        nombre,
        completado,
      }
      setTareas(tareasActualizadas)
      limpiar()
    }
  }

  const eliminarTarea = async (id) => {
    const res = await fetch(`http://localhost:3000/api/tareas/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id)
      setTareas(tareasActualizadas)
      limpiar()
    }
  }

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completado">Completado: </label>
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
        </div>
        {!editando && (
          <button type="button" onClick={agregarTarea}>
            Agregar
          </button>
        )}
        {editando && (
          <button type="button" onClick={guardarTarea}>
            Guardar
          </button>
        )}
        <button type="button">Cancelar</button>
      </form>

      <h3>Lista de Tareas</h3>

      <p>
        Tareas Completas: {tareas.filter((tarea) => tarea.completado).length}
        <br />
        Tareas Incompletas: {tareas.filter((tarea) => !tarea.completado).length}
      </p>

      {tareas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Completado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nombre}</td>
                <td>{t.completado ? "✅" : "❌"}</td>
                <td>
                  <button onClick={() => editarTarea(t)}>✏️</button>
                  <button onClick={() => eliminarTarea(t.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default App
