import { useEffect, useState } from 'react'

function App() {
  const [tareas, setTareas] = useState([])
  const [nombre, setNombre] = useState('')
  //const [editId, setEditId] = useState(null)

  useEffect(() => {
    const fetchTareas = async () => {
      const res = await fetch('http://localhost:3000/tareas')
      const data = await res.json()
      setTareas(data)
    }
    fetchTareas()
  }, [])

  const agregarTarea = async () => {
    const res = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, completada: false }),
    })
    if (res.ok) {
      const nuevaTarea = await res.json()
      setTareas([...tareas, nuevaTarea])
      setNombre('')
    }
  }

  const marcarCompletada = async (id, completada) => {
    const res = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada: !completada }),
    })
    if (res.ok) {
      const tareaModificada = await res.json()
      setTareas(tareas.map(t => (t.id === id ? tareaModificada : t)))
    }
  }

  const eliminarTarea = async (id) => {
    await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' })
    setTareas(tareas.filter(t => t.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    agregarTarea()
  }

  const handleMarcarCompletada = (tarea) => {
    marcarCompletada(tarea.id, tarea.completada)
  }

  const totalTareas = tareas.length
  const completadas = tareas.filter(t => t.completada).length
  const noCompletadas = totalTareas - completadas

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre de la tarea"/>
        <button type="submit">Agregar Tarea</button>
      </form>

      <p>Total de tareas: {totalTareas}</p>
      <p>Completadas: {completadas}</p>
      <p>No completadas: {noCompletadas}</p>

      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            {tarea.nombre} - {tarea.completada ? 'Completada' : 'No completada'}
            <button onClick={() => handleMarcarCompletada(tarea)}>{tarea.completada ? 'Marcar como no completada' : 'Marcar como completada'}</button>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
