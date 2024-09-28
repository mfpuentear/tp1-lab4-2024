import { useEffect, useState } from "react"

function Aplicacion() {
  const [listaDeTareas, establecerListaDeTareas] = useState([])
  const [tituloTarea, establecerTituloTarea] = useState("")
  const [estadoCompletado, establecerEstadoCompletado] = useState(false)
  const [tareaEnEdicion, establecerTareaEnEdicion] = useState(null)

  useEffect(() => {
    const obtenerTareas = async () => {
      const respuesta = await fetch("http://localhost:3000/tareas")
      if (respuesta.ok) {
        const datosTareas = await respuesta.json()
        establecerListaDeTareas(datosTareas)
      }
    }
    obtenerTareas()
  })

  const reiniciarFormulario = () => {
    establecerTituloTarea("")
    establecerEstadoCompletado(false)
    establecerTareaEnEdicion(null)
  }

  const agregarNuevaTarea = async () => {
    const respuesta = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: tituloTarea,
        completado: estadoCompletado,
      }),
    })

    if (respuesta.ok) {
      const nuevaTarea = await respuesta.json()
      establecerListaDeTareas([...listaDeTareas, nuevaTarea])
      reiniciarFormulario()
    }
  }

  const modificarTarea = (tarea) => {
    establecerTareaEnEdicion(tarea)
    establecerTituloTarea(tarea.nombre)
    establecerEstadoCompletado(tarea.completado)
  }

  const actualizarTarea = async () => {
    const respuesta = await fetch(`http://localhost:3000/tareas/${tareaEnEdicion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: tituloTarea,
        completado: estadoCompletado,
      }),
    })

    if (respuesta.ok) {
      const indice = listaDeTareas.findIndex((tarea) => tarea.id === tareaEnEdicion.id)
      const tareasActualizadas = [...listaDeTareas]
      tareasActualizadas[indice] = {
        ...tareasActualizadas[indice],
        nombre: tituloTarea,
        completado: estadoCompletado,
      }
      establecerListaDeTareas(tareasActualizadas)
      reiniciarFormulario()
    }
  }

  const borrarTarea = async (id) => {
    const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
    })

    if (respuesta.ok) {
      const tareasFiltradas = listaDeTareas.filter((tarea) => tarea.id !== id)
      establecerListaDeTareas(tareasFiltradas)
      reiniciarFormulario()
    }
  }

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="nombre">Título: </label>
          <input
            type="text"
            value={tituloTarea}
            onChange={(e) => establecerTituloTarea(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completado">Finalizado: </label>
          <input
            type="checkbox"
            checked={estadoCompletado}
            onChange={(e) => establecerEstadoCompletado(e.target.checked)}
          />
        </div>
        {!tareaEnEdicion && (
          <button type="button" onClick={agregarNuevaTarea}>
            Añadir
          </button>
        )}
        {tareaEnEdicion && (
          <button type="button" onClick={actualizarTarea}>
            Guardar Cambios
          </button>
        )}
        <button type="button" onClick={reiniciarFormulario}>Cancelar</button>
      </form>

      <h3>Listado de Tareas</h3>

      <p>
        Tareas Finalizadas: {listaDeTareas.filter((tarea) => tarea.completado).length}
        <br />
        Tareas Pendientes: {listaDeTareas.filter((tarea) => !tarea.completado).length}
      </p>

      {listaDeTareas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Finalizado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaDeTareas.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nombre}</td>
                <td>{t.completado ? "Completo" : "Incompleto"}</td>
                <td>
                  <button onClick={() => modificarTarea(t)}>Editar Tarea</button>
                  <button onClick={() => borrarTarea(t.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Aplicacion
